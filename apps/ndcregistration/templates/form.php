<?php
\OCP\Util::addStyle('ndcregistration', 'style');
\OCP\Util::addScript('ndcregistration', 'form');
if (\OCP\Util::getVersion()[0] >= 12) {
	\OCP\Util::addStyle('core', 'guest');
}
?><form action="<?php print_unescaped(\OC::$server->getURLGenerator()->linkToRoute('registration.register.createAccount', ['token'=>$_['token']])) ?>" method="post">
	<input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']) ?>" />
	<fieldset>
		<?php if (!empty($_['errormsgs'])) {?>
		<ul class="error">
			<?php foreach ($_['errormsgs'] as $errormsg) { ?>
			<li><?php p($errormsg); ?></li>
			<?php } ?>
		</ul>
		<?php } else { ?>
		<p class="msg" style="text-align: center;">
			<?php p($l->t('Welcome, you can create your account below.'));?>
		</p>
		<?php } ?>
		<p class="grouptop">
			<input type="email" name="email" id="email" value="<?php p($_['email']); ?>" disabled />
			<label for="email" class="infield"><?php p($_['email']); ?></label>
			<img id="email-icon" class="svg" src="<?php print_unescaped(image_path('', 'actions/mail.svg')); ?>" alt=""/>
		</p>

		<p class="groupmiddle">
			<input type="text" name="username" id="username" value="<?php if (!empty($_['entered_data']['user'])) {
	p($_['entered_data']['user']);
} ?>" placeholder="<?php p($l->t('Username')); ?>" <?php if ($_['lock_username'] === true) {p('disabled');} ?> />
			<label for="username" class="infield"><?php p($l->t('Username')); ?></label>
			<img id="username-icon" class="svg" src="<?php print_unescaped(image_path('', 'actions/user.svg')); ?>" alt=""/>
		</p>

		<p class="groupmiddle">
			<input type="password" name="password" id="password" placeholder="<?php p($l->t('Password')); ?>"/>
			<label for="password" class="infield"><?php p($l->t('Password')); ?></label>
			<img id="password-icon" class="svg" src="<?php print_unescaped(image_path('', 'actions/password.svg')); ?>" alt=""/>
			<?php if (\OC::$server->getConfig()->getAppValue('core', 'vendor', '') === 'nextcloud') { ?>
			<input id="show" name="show" type="checkbox">
			<label id="show-password" style="display: inline;" for="show"></label>
			<?php } else { ?>
			<input type="checkbox" id="showadminpass" name="showadminpass">
			<label for="showadminpass"></label>
			<?php } ?>
		</p>

		<p class="groupbottom">
			<input type="password" name="confpassword" id="confpassword" placeholder="<?php p($l->t('Confirm password')); ?>"/>
			<label for="confpassword" class="infield"><?php p($l->t('Confirm password')); ?></label>
			<img id="password-icon" class="svg" src="<?php print_unescaped(image_path('', 'actions/password.svg')); ?>" alt=""/>
		</p>

		<input type="submit" id="submit" value="<?php p($l->t('Create account')); ?>" />
	</fieldset>
</form>
