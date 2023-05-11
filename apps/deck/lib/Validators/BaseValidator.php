<?php
/**
 * @copyright Copyright (c) 2016 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author Maxence Lange <maxence@artificial-owl.com>
 * @author Luka Trovic <luka.trovic@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

declare(strict_types=1);

namespace OCA\Deck\Validators;

use Exception;
use OCA\Deck\BadRequestException;

abstract class BaseValidator {

	/**
	 * @return array
	 */
	abstract public function rules();

	/**
	 * Validate given entries
	 *
	 * @param array $data
	 * @return void
	 * @throws BadRequestException
	 */
	private function validate($data) {
		$rules = $this->rules();

		foreach ($data as $field => $value) {
			$field_rule = $rules[$field];

			if (is_array($field_rule)) {
				foreach ($field_rule as $rule) {
					// The format for specifying validation rules and parameters follows an
					// easy {rule}:{parameters} formatting convention. For instance the
					// rule "Max:3" states that the value may only be three letters.
					if (strpos($rule, ':') !== false) {
						[$rule, $parameter] = explode(':', $rule, 2);
						if (!$this->{$rule}($value, $parameter)) {
							throw new BadRequestException(
								$this->getErrorMessage($rule, $field, $parameter));
						}
					} else {
						if (!$this->{$rule}($value)) {
							throw new BadRequestException(
								$field . ' must be provided and must be '. str_replace("_", " ", $rule));
						}
					}
				}
			}

			if (is_callable($field_rule) && !$field_rule($value)) {
				throw new BadRequestException($field . ' must be provided');
			}
		}
	}

	/**
	 * @param array $data
	 * @return void
	 * @throws BadRequestException
	 */
	public function check(array $data) {
		$this->validate($data);
	}

	/**
	 * @param $value
	 * @return bool
	 */
	private function numeric($value): bool {
		return is_numeric($value);
	}

	/**
	 * @param $value
	 * @return bool
	 */
	private function bool($value): bool {
		return is_bool($value);
	}

	/**
	 * @param $value
	 * @return bool
	 */
	private function not_false($value): bool {
		return ($value !== false) && ($value !== 'false');
	}

	/**
	 * @param $value
	 * @return bool
	 */
	private function not_null($value): bool {
		return !is_null($value);
	}

	/**
	 * @param $value
	 * @return bool
	 */
	private function not_empty($value): bool {
		return !empty($value);
	}

	/**
	 * @throws Exception
	 */
	private function max($value, $limit): bool {
		if (!$limit || !is_numeric($limit)) {
			throw new Exception("Validation rule max requires at least 1 parameter. " . json_encode($limit));
		}
		return $this->getSize($value) <= $limit;
	}

	/**
	 * @throws Exception
	 */
	private function min($value, $limit): bool {
		if (!$limit || !is_numeric($limit)) {
			throw new Exception("Validation rule max requires at least 1 parameter.");
		}
		return $this->getSize($value) >= $limit;
	}

	/**
	 * Get the size of an attribute.
	 *
	 * @param  mixed  $value
	 * @return int
	 */
	protected function getSize($value): int {
		// This method will determine if the attribute is a number or string and
		// return the proper size accordingly. If it is a number, then number itself
		// is the size.
		if (is_int($value)) {
			return $value;
		} elseif (is_array($value)) {
			return count($value);
		}

		return mb_strlen($value ?? '');
	}

	/**
	 * @param $rule
	 * @param $field
	 * @param $parameter
	 * @return string
	 */
	protected function getErrorMessage($rule, $field, $parameter = null): string {
		if (in_array($rule, ['max', 'min'])) {
			return $rule === 'max'
			? $field . ' cannot be longer than '. $parameter . ' characters '
			: $field . ' must be at least '. $parameter . ' characters long ';
		}

		return $field . ' must be provided and must be '. str_replace("_", " ", $rule);
	}
}
