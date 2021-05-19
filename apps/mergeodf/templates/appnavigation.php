<div id="app-navigation">
	<ul class="with-icon">

		<?php

		$pinned = 0;
		foreach ($_['navigationItems'] as $item) {
			$pinned = NavigationListElements($item, $l, $pinned);
		}
		?>

	</ul>
	<div id="app-settings">
		<div id="app-settings-header">
			<button class="settings-button"
					data-apps-slide-toggle="#app-settings-content">
				<?php p($l->t('Settings')); ?>
			</button>
		</div>
	</div>
</div>


<?php

/**
 * Prints the HTML for a single Entry.
 *
 * @param $item The item to be added
 * @param $l Translator
 * @param $pinned IntegerValue to count the pinned entries at the bottom
 *
 * @return int Returns the pinned value
 */
function NavigationListElements($item, $l, $pinned) {
	strpos($item['classes'] ?? '', 'pinned') !== false ? $pinned++ : '';
	?>
	<li
		data-id="<?php p($item['id']) ?>"
		<?php if (isset($item['dir'])) { ?> data-dir="<?php p($item['dir']); ?>" <?php } ?>
		<?php if (isset($item['view'])) { ?> data-view="<?php p($item['view']); ?>" <?php } ?>
		<?php if (isset($item['expandedState'])) { ?> data-expandedstate="<?php p($item['expandedState']); ?>" <?php } ?>
		class="nav-<?php p($item['id']) ?>
		<?php if (isset($item['classes'])) { p($item['classes']); } ?>
		<?php p($pinned === 1 ? 'first-pinned' : '') ?>
		<?php if (isset($item['defaultExpandedState']) && $item['defaultExpandedState']) { ?> open<?php } ?>"
		<?php if (isset($item['folderPosition'])) { ?> folderposition="<?php p($item['folderPosition']); ?>" <?php } ?>>

		<a href="<?php p(isset($item['href']) ? $item['href'] : '#') ?>"
		   class="nav-icon-<?php p(isset($item['icon']) && $item['icon'] !== '' ? $item['icon'] : $item['id']) ?> svg"><?php p($item['name']); ?></a>

	</li>


	<?php
	return $pinned;
}