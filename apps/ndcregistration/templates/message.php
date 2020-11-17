<?php
\OCP\Util::addStyle('ndcregistration', 'style');
\OCP\Util::addScript('ndcregistration', 'script');
if (\OCP\Util::getVersion()[0] >= 12) {
	\OCP\Util::addStyle('core', 'guest');
}
?>
<ul class="msg error-wide nc-theming-main-text">
	<li><?php print_unescaped($_['msg'])?></li>
</ul>
<p style="margin-top:24px;"><a id="gologin"><?php p($l->t('Back to login page')); ?></a></p>