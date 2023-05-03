<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2021, Lukas Reschke <lukas@statuscode.ch>
 *
 * @author Lukas Reschke <lukas@statuscode.ch>
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
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace Test\Http\Client;

use OCP\Http\Client\LocalServerException;
use OC\Http\Client\LocalAddressChecker;
use Psr\Log\LoggerInterface;

class LocalAddressCheckerTest extends \Test\TestCase {
	/** @var LocalAddressChecker */
	private $localAddressChecker;

	protected function setUp(): void {
		parent::setUp();

		$logger = $this->createMock(LoggerInterface::class);
		$this->localAddressChecker = new LocalAddressChecker($logger);
	}

	/**
	 * @dataProvider dataPreventLocalAddress
	 * @param string $uri
	 */
	public function testThrowIfLocalAddress($uri) : void {
		$this->expectException(LocalServerException::class);
		$this->localAddressChecker->ThrowIfLocalAddress('http://' . $uri);
	}

	/**
	 * @dataProvider dataAllowLocalAddress
	 * @param string $uri
	 */
	public function testThrowIfLocalAddressGood($uri) : void {
		$this->localAddressChecker->ThrowIfLocalAddress('http://' . $uri);
		$this->assertTrue(true);
	}


	/**
	 * @dataProvider dataInternalIPs
	 * @param string $ip
	 */
	public function testThrowIfLocalIpBad($ip) : void {
		$this->expectException(LocalServerException::class);
		$this->localAddressChecker->ThrowIfLocalIp($ip);
	}

	/**
	 * @dataProvider dataPublicIPs
	 * @param string $ip
	 */
	public function testThrowIfLocalIpGood($ip) : void {
		$this->localAddressChecker->ThrowIfLocalIp($ip);
		$this->assertTrue(true);
	}

	public function dataPublicIPs() : array {
		return [
			['8.8.8.8'],
			['8.8.4.4'],
			['2001:4860:4860::8888'],
			['2001:4860:4860::8844'],
		];
	}

	public function dataInternalIPs() : array {
		return [
			['192.168.0.1'],
			['fe80::200:5aee:feaa:20a2'],
			['0:0:0:0:0:ffff:10.0.0.1'],
			['0:0:0:0:0:ffff:127.0.0.0'],
			['10.0.0.1'],
			['::'],
			['::1'],
			['100.100.100.200'],
			['192.0.0.1'],
		];
	}

	public function dataPreventLocalAddress():array {
		return [
			['localhost/foo.bar'],
			['localHost/foo.bar'],
			['random-host/foo.bar'],
			['[::1]/bla.blub'],
			['[::]/bla.blub'],
			['192.168.0.1'],
			['172.16.42.1'],
			['[fdf8:f53b:82e4::53]/secret.ics'],
			['[fe80::200:5aee:feaa:20a2]/secret.ics'],
			['[0:0:0:0:0:ffff:10.0.0.1]/secret.ics'],
			['[0:0:0:0:0:ffff:127.0.0.0]/secret.ics'],
			['10.0.0.1'],
			['another-host.local'],
			['service.localhost'],
			['!@#$'], // test invalid url
			['100.100.100.200'],
			['192.0.0.1'],
			['randomdomain.internal'],
			['0177.0.0.9'],
			['⑯⑨。②⑤④。⑯⑨｡②⑤④'],
			['127。②⑤④。⑯⑨.②⑤④'],
			['127.0.00000000000000000000000000000000001'],
			['127.1'],
			['127.000.001'],
			['0177.0.0.01'],
			['0x7f.0x0.0x0.0x1'],
			['0x7f000001'],
			['2130706433'],
			['00000000000000000000000000000000000000000000000000177.1'],
			['0x7f.1'],
			['127.0x1'],
			['[0000:0000:0000:0000:0000:0000:0000:0001]'],
			['[0:0:0:0:0:0:0:1]'],
			['[0:0:0:0::0:0:1]'],
			['%31%32%37%2E%30%2E%30%2E%31'],
			['%31%32%37%2E%30%2E%30.%31'],
			['[%3A%3A%31]'],
		];
	}

	public function dataAllowLocalAddress():array {
		return [
			['example.com/foo.bar'],
			['example.net/foo.bar'],
			['example.org/foo.bar'],
			['8.8.8.8/bla.blub'],
			['8.8.4.4/bla.blub'],
			['8.8.8.8'],
			['8.8.4.4'],
			['[2001:4860:4860::8888]/secret.ics'],
		];
	}
}
