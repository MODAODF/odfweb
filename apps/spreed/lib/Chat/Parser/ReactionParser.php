<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2021 Vitor Mattos <vitor@php.rio>
 *
 * @author Vitor Mattos <vitor@php.rio>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Talk\Chat\Parser;

use OCA\Talk\Chat\ChatManager;
use OCA\Talk\Model\Message;
use OCP\IL10N;

class ReactionParser {
	private ?IL10N $l = null;
	/**
	 * @param Message $message
	 * @throws \OutOfBoundsException
	 */
	public function parseMessage(Message $message): void {
		$comment = $message->getComment();
		if (!in_array($comment->getVerb(), [ChatManager::VERB_REACTION, ChatManager::VERB_REACTION_DELETED], true)) {
			throw new \OutOfBoundsException('Not a reaction');
		}
		$this->l = $message->getL10n();
		$message->setMessageType(ChatManager::VERB_SYSTEM);
		if ($comment->getVerb() === ChatManager::VERB_REACTION_DELETED) {
			// This message is necessary to make compatible with old clients
			$message->setMessage($this->l->t('Reaction deleted by author'), [], $comment->getVerb());
		} else {
			$message->setMessage($message->getMessage(), [], $comment->getVerb());
		}
	}
}
