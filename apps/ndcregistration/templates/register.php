<?php
\OCP\Util::addStyle('ndcregistration', 'style');
\OCP\Util::addScript('ndcregistration', 'captcha');
if (\OCP\Util::getVersion()[0] >= 12) {
	\OCP\Util::addStyle('core', 'guest');
}
if ($_['entered']): ?>
	<?php if (empty($_['errormsg'])): ?>
		<ul class="success">
			<li>
			<?php p($l->t('Thank you for registering, you should receive a verification link in a few minutes.')); ?>
			</li>
		</ul>
	<?php else: ?>
		<form action="<?php print_unescaped(\OC::$server->getURLGenerator()->linkToRoute('ndcregistration.register.validateEmail')) ?>" method="post" autocomplete="off">
			<fieldset>
				<ul class="error">
					<li><?php p($_['errormsg']); ?></li>
				</ul>
				<p class="groupofone">
					<input type="email" name="email" id="email" placeholder="<?php p($l->t('Email')); ?>" value="" required autofocus />
					<label for="email" class="infield"><?php p($l->t('Email')); ?></label>
					<img id="email-icon" class="svg" src="<?php print_unescaped(image_path('', 'actions/mail.svg')); ?>" alt=""/>
				</p>
				<p class="groupofone">
					<p><center>
						<?php p($l->t('Click the picture to change the verification code')); ?><br>
						<img id="captcha" style="cursor:pointer" src="<?php print_unescaped(\OC::$server->getURLGenerator()->linkToRoute('ndcregistration.captcha.imageCode')) ?>">
					</center></p>
					<input type="text" name="captcha" id="checkcaptcha" placeholder="<?php p($l->t('Text in picture')); ?>"" value="" required>
					<label for="checkcaptcha" class="infield"><?php p($l->t('Text in picture')); ?></label>
				</p>
				<input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']); ?>" />
				<input type="submit" id="submit" value="<?php p($l->t('Request verification link')); ?>" />
			</fieldset>
		</form>
	<?php endif; ?>
<?php else: ?>
	<form action="<?php print_unescaped(\OC::$server->getURLGenerator()->linkToRoute('ndcregistration.register.validateEmail')) ?>" method="post" autocomplete="off">
		<fieldset>
			<?php if ($_['errormsg']): ?>
				<ul class="error">
					<li><?php p($_['errormsg']); ?></li>
					<li><?php p($l->t('Please re-enter a valid email address')); ?></li>
				</ul>
			<?php else: ?>
				<p>
					<center><?php p($l->t('You will receive an email with a verification link')); ?></center>
				</p>
			<?php endif; ?>
			<p class="groupofone">
			<input type="email" name="email" id="email" placeholder="<?php p($l->t('Email')); ?>" value="" required autofocus />
				<label for="email" class="infield"><?php p($l->t('Email')); ?></label>
				<img id="email-icon" class="svg" src="<?php print_unescaped(image_path('', 'actions/mail.svg')); ?>" alt=""/>
			</p>
			<p class="groupofone">
				<p><center>
					<?php p($l->t('Click the picture to change the verification code')); ?><br>
					<img id="captcha" style="cursor:pointer" src="<?php print_unescaped(\OC::$server->getURLGenerator()->linkToRoute('ndcregistration.captcha.imageCode')) ?>">
				</center></p>
				<input type="text" name="captcha" id="checkcaptcha" placeholder="<?php p($l->t('Text in picture')); ?>"" value="" required>
				<label for="checkcaptcha" class="infield"><?php p($l->t('Text in picture')); ?></label>
			</p>
			<input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']); ?>" />
			<input type="submit" id="submit" value="<?php p($l->t('Request verification link')); ?>" />
		</fieldset>
	</form>
<?php endif; ?>
