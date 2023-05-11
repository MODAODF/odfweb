# Changelog
All notable changes to this project will be documented in this file.

## 1.7.4

### Fixed

- Gracefully handle not found card for a share [#4569](https://github.com/nextcloud/deck/pull/4569)
- fix: Use passed userid when getting attachment folder [#4541](https://github.com/nextcloud/deck/pull/4541)
- fix: Append datetime picker to body to avoid cut off [#4646](https://github.com/nextcloud/deck/pull/4646)
- Permanently delete deck cards marked as deleted after 5 min in a cron job [#4302](https://github.com/nextcloud/deck/pull/4302)
- Fix : Overlapping expiry dates on tags [#4538](https://github.com/nextcloud/deck/pull/4538)
- Update dependencies

## 1.7.3

### Fixed

- feat: add validators to check values in services @juliushaertl [#4176](https://github.com/nextcloud/deck/pull/4176)
- Add integration test for attachment handling on cards [#4178](https://github.com/nextcloud/deck/pull/4178)
- disables autocomplete on card creation @juliushaertl [#4182](https://github.com/nextcloud/deck/pull/4182)
- minor style fixes [#4202](https://github.com/nextcloud/deck/pull/4202)


## 1.7.2

### Fixed

- Cache user membership for circles [#4132](https://github.com/nextcloud/deck/pull/4132)
- Set event link also for notifications that get emitted from activities [#4118](https://github.com/nextcloud/deck/pull/4118)
- Fix Card menu not displaying when description is not set [#4103](https://github.com/nextcloud/deck/pull/4103)
- disable Create card button while no stack is chosen [#4019](https://github.com/nextcloud/deck/pull/4019)
- to nextcloud/OCP package in stable24 [#4093](https://github.com/nextcloud/deck/pull/4093)
- Fix attachment creator name: show display name [#4037](https://github.com/nextcloud/deck/pull/4037)
- Use capped memory cache for board permissions [#3997](https://github.com/nextcloud/deck/pull/3997)
- Improve CalDAV integration performance [#3995](https://github.com/nextcloud/deck/pull/3995)
- Fetch attachment folder for the correct user during cron job [#3959](https://github.com/nextcloud/deck/pull/3959)
- Switch to 'markdown-it-task-checkbox' for rendering of task lists [#3925](https://github.com/nextcloud/deck/pull/3925)
- Prevent opening card and applyLabelFilter on card drag end [#3917](https://github.com/nextcloud/deck/pull/3917)
- Fix for issue #3637 [#3901](https://github.com/nextcloud/deck/pull/3901)
- Fix z-index for deck sidebar [#3885](https://github.com/nextcloud/deck/pull/3885)

## 1.7.1

### Fixed
- Align Duedate-delete icon properly - fixes nextcloud/deck#3791 [#3817](https://github.com/nextcloud/deck/pull/3817)
- Increase file count after sharing [#3806](https://github.com/nextcloud/deck/pull/3806)
- Fetch full board data after cloning [#3781](https://github.com/nextcloud/deck/pull/3781)

## 1.7.0

### Added

- Transfer ownership @matchish @luka-nextcloud @juliushaertl [#2496](https://github.com/nextcloud/deck/pull/2496)
- Import from trello via CLI @vitormattos [#3182](https://github.com/nextcloud/deck/pull/3182)
- Add app config to toggle the default calendar setting as an admin @juliushaertl [#3528](https://github.com/nextcloud/deck/pull/3528)
- Show board name in browser title @luka-nextcloud [#3499](https://github.com/nextcloud/deck/pull/3499)
- Move DeleteCron to be time insensitive @juliushaertl [#3599](https://github.com/nextcloud/deck/pull/3599)
- 🚸 Shows error on board fetchData @vinicius73 [#3653](https://github.com/nextcloud/deck/pull/3653)
- Add support for PHP 8.1 @juliushaertl [#3601](https://github.com/nextcloud/deck/pull/3601)
- Nextcloud 24 compatibility

### Fixed

- CardApiController: Fix order of optional parameters @simonspa [#3512](https://github.com/nextcloud/deck/pull/3512)
- Exclude deleted boards in the selection for target @luka-nextcloud [#3502](https://github.com/nextcloud/deck/pull/3502)
- Fix CalDAV blocking and modernize circles API usage @juliushaertl [#3500](https://github.com/nextcloud/deck/pull/3500)
- Timestamps on created and modified at values @luka-nextcloud [#3532](https://github.com/nextcloud/deck/pull/3532)
- return the selector for collections @dartcafe [#3552](https://github.com/nextcloud/deck/pull/3552)
- Generate fixed link for activity emails @luka-nextcloud [#3611](https://github.com/nextcloud/deck/pull/3611)
- 🐛 Fix missing files sidebar @vinicius73 [#3635](https://github.com/nextcloud/deck/pull/3635)
- Handle description shortening more gracefully @juliushaertl [#3650](https://github.com/nextcloud/deck/pull/3650)
- Sort boards non case sensitive @Ben-Ro [#3560](https://github.com/nextcloud/deck/pull/3560)
- Remove unused argument from transfer ownership @juliushaertl [#3712](https://github.com/nextcloud/deck/pull/3712)
- Fix: Check all circle shares for permissions @bink [#3625](https://github.com/nextcloud/deck/pull/3625)
- Extend API changelog @juliushaertl [#3522](https://github.com/nextcloud/deck/pull/3522)
- Fix talk integration @nickvergessen [#3529](https://github.com/nextcloud/deck/pull/3529)
- Fix confusion between stackId and boardId in StackService @eneiluj [#3541](https://github.com/nextcloud/deck/pull/3541)
- Add horizontal scrollbar into the large table inside description @luka-nextcloud [#3531](https://github.com/nextcloud/deck/pull/3531)
- Make links in markdown note bolder @luka-nextcloud [#3530](https://github.com/nextcloud/deck/pull/3530)
- Update master php testing versions @nickvergessen [#3561](https://github.com/nextcloud/deck/pull/3561)
- Update master php enviroment @nickvergessen [#3582](https://github.com/nextcloud/deck/pull/3582)
- Make insert attachment buttom easy to click @luka-nextcloud [#3612](https://github.com/nextcloud/deck/pull/3612)
- Remove extra bullet @elitejake [#3613](https://github.com/nextcloud/deck/pull/3613)
- l10n: Delete space @Valdnet [#3666](https://github.com/nextcloud/deck/pull/3666)
- Update master php testing versions @nickvergessen [#3688](https://github.com/nextcloud/deck/pull/3688)
- Fix wording to represent the code behavior @q-wertz [#3685](https://github.com/nextcloud/deck/pull/3685)
- Fix cron jobs @nickvergessen [#3689](https://github.com/nextcloud/deck/pull/3689)
- Update master php testing versions @nickvergessen [#3695](https://github.com/nextcloud/deck/pull/3695)
- Optimise queries when preparing card related notifications @Raudius [#3690](https://github.com/nextcloud/deck/pull/3690)
- Properly check for the stack AND setting board permissions @juliushaertl [#3670](https://github.com/nextcloud/deck/pull/3670)
- Replace deprecated String.prototype.substr() @CommanderRoot [#3669](https://github.com/nextcloud/deck/pull/3669)
- Dependency updates
- Show cards after moving into another list [#3736](https://github.com/nextcloud/deck/pull/3736)
- Fix paramter replacements when creating deck cards from talk messages @nickvergessen [#3683](https://github.com/nextcloud/deck/pull/3683)
- Fix hidden attachment icon on archived cards [#3733](https://github.com/nextcloud/deck/pull/3733)
- Adapt the card modal to upstream changes [#3764](https://github.com/nextcloud/deck/pull/3764)
- Fix text selection in dark mode and modal view [#3765](https://github.com/nextcloud/deck/pull/3765)
- Add missing indices [#3754](https://github.com/nextcloud/deck/pull/3754)
- Handle qb mapper exception messages properly @juliushaertl [#3769](https://github.com/nextcloud/deck/pull/3769)

## 1.6.0-beta1

### Added

- #3177 Use async import for vue component on collections entrypoint @juliushaertl
- #2791 Open description links in new tab @fm-sys
- #3344 Improve combined search @eneiluj
- #3362 Improve search performance @eneiluj
- #2710 Due date shortcuts in the datepicker @jakobroehrl

### Fixed

- #3161 Reduce duplicate queries when fetching user boards an permissions @juliushaertl
- #3151 Always log generic exceptions @juliushaertl
- #3217 Move circle checks to a unified service and improve member checks @juliushaertl
- #3225 Check for null value to avoid TypeError in the group manager @juliushaertl
- #3263 Defer obtaining the user session in the config service  @juliushaertl
- #3294 Fix print style issues @weeman1337
- #3299 Return false instead of throwing when getting calendar setting @juliushaertl
- #3298 Delete file shares through attachments API @juliushaertl
- #3343 Fix search pagination cursor @eneiluj
- #3326 add autofocus on board edit @weeman1337
- #3323 Extend drag-and-drop zone in card sidebar @old-green-frog
- #3364 Fix optional parameter order @juliushaertl
- #3324 Fix menu button position in card modal @valerydmitrieva
- #3391 Use displayname instead of uid for mentions (reopened against master) @kffl
- #3316 Additional check for stacks @juliushaertl
- #3357 Revert "Fix search pagination cursor" @juliushaertl
- #3327 Do not show both bullets and checkboxes for checklists @Themanwhosmellslikesugar
- #3375 Show absolute dates when printing @weeman1337
- #3376 Print assignee names @weeman1337
- #3384 Keep exceptions http response generic @juliushaertl


## 1.4.0 - 2021-04-13

### Added

* [#2934](https://github.com/nextcloud/deck/pull/2934) Advanced search queries (see [documentation](https://deck.readthedocs.io/en/latest/User_documentation_en/#search) for more details)
* [#2933](https://github.com/nextcloud/deck/pull/2933) Move full text search to proper events

### Fixed
* [#2964](https://github.com/nextcloud/deck/pull/2964) Fix navigating to board details

* Dependency updates

## 1.3.0

### Added
* [#2638](https://github.com/nextcloud/deck/pull/2638) Sharing files to cards
* [#2683](https://github.com/nextcloud/deck/pull/2683) Handle clicks on calendar entries
* Nextcloud 21 compatiblity

### Fixed
* [#2622](https://github.com/nextcloud/deck/pull/2622) Fix gradient and stack header spacing for safari
* [#2626](https://github.com/nextcloud/deck/pull/2626) Adding a description icon to cards when they contain a description without any checkmarks @MonkeySon
* [#2659](https://github.com/nextcloud/deck/pull/2659) Matching color of description cursor with text color @JonFStr
* [#2676](https://github.com/nextcloud/deck/pull/2676) Only load filter view when shown
* [#2680](https://github.com/nextcloud/deck/pull/2680) Do not try to add change data if it doesn't exist
* [#2681](https://github.com/nextcloud/deck/pull/2681) Filter out deleted stacks from results
* [#2685](https://github.com/nextcloud/deck/pull/2685) Show all boards in move card dialog @jakobroehrl
* [#2687](https://github.com/nextcloud/deck/pull/2687) 3dots no opacity @jakobroehrl
* [#2688](https://github.com/nextcloud/deck/pull/2688) Title > boardname @jakobroehrl
* [#2689](https://github.com/nextcloud/deck/pull/2689) Modal > bigger view wording @jakobroehrl

## 1.3.0-beta2

### Fixed
* [#2700](https://github.com/nextcloud/deck/pull/2700) Attempt to copy file on dropping it to deck @juliushaertl
* [#2701](https://github.com/nextcloud/deck/pull/2701) Fix uploading files by drag and drop @juliushaertl
* [#2707](https://github.com/nextcloud/deck/pull/2707) L10n: Change to a capital letter @Valdnet
* [#2712](https://github.com/nextcloud/deck/pull/2712) Docs: Fix table in section "GET /api/v1.0/config" @das-g
* [#2716](https://github.com/nextcloud/deck/pull/2716) Remove repair step which is no longer needed as we cleanup properly @juliushaertl
* [#2723](https://github.com/nextcloud/deck/pull/2723) Pad random color with leading zeroes @PVince81
* [#2729](https://github.com/nextcloud/deck/pull/2729) Remove invalid activity parameters @nickvergessen
* [#2750](https://github.com/nextcloud/deck/pull/2750) Fix deck activity emails not being translated @nickvergessen
* [#2751](https://github.com/nextcloud/deck/pull/2751) Properly set author for activity events that are triggered by cron @juliushaertl


## 1.2.2 - 2020-11-24

### Fixed

* [#2584](https://github.com/nextcloud/deck/pull/2584) Fix updating checkbox state and avoid issues due to duplicate sidebar element
* [#2586](https://github.com/nextcloud/deck/pull/2586) Fix card details button
* [#2587](https://github.com/nextcloud/deck/pull/2587) Move modal top spacing to the header to avoid side-effect when scrolling
* [#2588](https://github.com/nextcloud/deck/pull/2588) Do not render images in editor
* [#2609](https://github.com/nextcloud/deck/pull/2609) Fix issue with depenendency causing newline comments to not show
* [#2611](https://github.com/nextcloud/deck/pull/2611) Fix paragraph styling in comments

## 1.2.1 - 2020-11-18

### Fixed

* [#2570](https://github.com/nextcloud/deck/pull/2570) [#2571](https://github.com/nextcloud/deck/pull/2571) Fix error when deleting users @ksteinb
* [#2573](https://github.com/nextcloud/deck/pull/2573) Fix issue where card description was changed on the wrong card when switching cards

## 1.2.0 - 2020-11-16

### Added

* [#2430](https://github.com/nextcloud/deck/pull/2430) Due date notification setting per board
* [#2230](https://github.com/nextcloud/deck/pull/2230) Implement scrolling per stack
* [#1396](https://github.com/nextcloud/deck/pull/1396) API: Expose canCreateBoards through capabilities
* [#2245](https://github.com/nextcloud/deck/pull/2245) API: ETag support for API endpoints

### Fixed

* [#2330](https://github.com/nextcloud/deck/pull/2330) Enhanced undo handling for deletions @jakobroehrl
* [#2336](https://github.com/nextcloud/deck/pull/2336) Run unit tests on github actions
* [#2358](https://github.com/nextcloud/deck/pull/2358) Properly check if FTSEvent has an argument set
* [#2359](https://github.com/nextcloud/deck/pull/2359) Also exclude deleted items from calendar boards
* [#2361](https://github.com/nextcloud/deck/pull/2361) Comments do not depend on the comments app @jakobroehrl
* [#2363](https://github.com/nextcloud/deck/pull/2363) Use uid instead of displayname for sharee results
* [#2367](https://github.com/nextcloud/deck/pull/2367) Properly handle multiple shares in a row and refactor sharee loading
* [#2404](https://github.com/nextcloud/deck/pull/2404) Update Controls.vue @Flamenco
* [#2433](https://github.com/nextcloud/deck/pull/2433) Fix scrollable titles with Dyslexia font
* [#2434](https://github.com/nextcloud/deck/pull/2434) Move most destructive actions in drop down menus to the bottom @Nienzu
* [#2435](https://github.com/nextcloud/deck/pull/2435) Do not open the dialog automatically upon card creation, only upon click
* [#2437](https://github.com/nextcloud/deck/pull/2437) Only remove card padding for editable cards
* [#2440](https://github.com/nextcloud/deck/pull/2440) Move navigation toggle handling to @nextcloud/vue native one
* [#2463](https://github.com/nextcloud/deck/pull/2463) Changed triple dots to ellipsis @rakekniven
* [#2500](https://github.com/nextcloud/deck/pull/2500) Move details and description to dedicated component
* [#2517](https://github.com/nextcloud/deck/pull/2517) Filter out duplicate cards in overview
* [#2502](https://github.com/nextcloud/deck/pull/2502) Assignment code refactoring
* [#2519](https://github.com/nextcloud/deck/pull/2519) Fix invisibility bug on modal component @wrox
* [#2520](https://github.com/nextcloud/deck/pull/2520) Add placeholder for the description input
* [#2521](https://github.com/nextcloud/deck/pull/2521) Add migration step to make table layout consistent
* [#2524](https://github.com/nextcloud/deck/pull/2524) Only try to extract first part of the explode result
* [#2531](https://github.com/nextcloud/deck/pull/2531) Add proper type to boolean parameter
* [#2532](https://github.com/nextcloud/deck/pull/2532) Fix handling of notifications if a board does no longer exist
* [#2536](https://github.com/nextcloud/deck/pull/2536) Only set flex layout on the active tab
* [#2538](https://github.com/nextcloud/deck/pull/2538) Do not reset filter when staying on the same board
* [#2539](https://github.com/nextcloud/deck/pull/2539) Apply proper checks for menu items
* [#2540](https://github.com/nextcloud/deck/pull/2540) Only build one main bundle
* [#2562](https://github.com/nextcloud/deck/pull/2562) Only try to extract first part of the explode result (Part 2)


## 1.1.0 - 2020-10-03

### Features

* [#2115](https://github.com/nextcloud/deck/pull/2115) Dashboard widget for Nextcloud 20
* [#1545](https://github.com/nextcloud/deck/pull/1545) Show cards in calendar/tasks app and make them available though CalDAV
* [#2200](https://github.com/nextcloud/deck/pull/2200) Unified search implementation for Nextcloud 20
* [#1934](https://github.com/nextcloud/deck/pull/1934) Upcoming cards overview @jakobroehrl
* [#2047](https://github.com/nextcloud/deck/pull/2047) Show card details in modal @jakobroehrl
* [#1853](https://github.com/nextcloud/deck/pull/1853) Archive all cards from stack @jakobroehrl
* [#1865](https://github.com/nextcloud/deck/pull/1865) Add stack button on empty board @jakobroehrl
* [#1926](https://github.com/nextcloud/deck/pull/1926) New filter: unassigned cards @jakobroehrl

### Bugfixes

* [#2035](https://github.com/nextcloud/deck/pull/2035) Attach files in description @jakobroehrl
* [#2123](https://github.com/nextcloud/deck/pull/2123) Fix control tooltip @jakobroehrl
* [#2144](https://github.com/nextcloud/deck/pull/2144) Fix nextcloud if install with dev dependencies @matchish
* [#2158](https://github.com/nextcloud/deck/pull/2158) Fix description in dark mode
* [#2188](https://github.com/nextcloud/deck/pull/2188) CardBadges: Count checkboxes started with "+ [ ]" @joreiff
* [#2206](https://github.com/nextcloud/deck/pull/2206) Fix read-only sidebar (fixes #2033)
* [#2208](https://github.com/nextcloud/deck/pull/2208) Fix design, dark mode and keyboard navigation of the board list
* [#2210](https://github.com/nextcloud/deck/pull/2210) Fix an incorrect/misleading message in lib/Service/BoardService.php @jordanbancino
* [#2243](https://github.com/nextcloud/deck/pull/2243) Various smaller styling fixes
* [#2244](https://github.com/nextcloud/deck/pull/2244) Toggle filter on clicking card labels
* [#2117](https://github.com/nextcloud/deck/pull/2117) Activity fixes
* [#2255](https://github.com/nextcloud/deck/pull/2255) Use unified search events to apply on board filtering
* [#2271](https://github.com/nextcloud/deck/pull/2271) Sort tags in filter @jakobroehrl
* [#2318](https://github.com/nextcloud/deck/pull/2318) Card title: prevent space and no text @jakobroehrl
* [#2319](https://github.com/nextcloud/deck/pull/2319) Move style loading to BeforeTemplateRenderedEvent
* [#2320](https://github.com/nextcloud/deck/pull/2320) Consistent naming @jakobroehrl
* [#2252](https://github.com/nextcloud/deck/pull/2252) Fix double slash in the deck activity links @baraksoa
* [#2270](https://github.com/nextcloud/deck/pull/2270) Fix empty content view to align with other widgets
* [#2275](https://github.com/nextcloud/deck/pull/2275) Wait for services to be registered before performing further setup that requires services
* [#2278](https://github.com/nextcloud/deck/pull/2278) Fix wrong SQL queries @Chartman123
* [#2279](https://github.com/nextcloud/deck/pull/2279) L10n:add translation to card placeholder @mjanssens
* [#2282](https://github.com/nextcloud/deck/pull/2282) Duedate picker localization
* [#2283](https://github.com/nextcloud/deck/pull/2283) Do not handle exceptions from page controller in the ExceptionMiddleware
* [#2298](https://github.com/nextcloud/deck/pull/2298) Use absolute URLs for the search @nickvergessen



## 1.0.5 - 2020-07-15

### Fixed


* [#2116](https://github.com/nextcloud/deck/pull/2116) Fix navigation layout issues @juliushaertl
* [#2118](https://github.com/nextcloud/deck/pull/2118) Use proper parameter when handling attachments @juliushaertl

## 1.0.4 - 2020-06-26

### Fixed

* [#2062](https://github.com/nextcloud/deck/pull/2062) Fix saving card description after toggling checkboxes @juliushaertl
* [#2065](https://github.com/nextcloud/deck/pull/2065) Adding CSS rule for Markdown Blockquotes @reox
* [#2059](https://github.com/nextcloud/deck/pull/2059) Fix fetching attachments on card change @juliushaertl
* [#2060](https://github.com/nextcloud/deck/pull/2060) Use mixing for relative date in card sidebar @juliushaertl


## 1.0.3 - 2020-06-19

### Fixed

* [#2019](https://github.com/nextcloud/deck/pull/2019) Remove old global css rule @juliushaertl
* [#2020](https://github.com/nextcloud/deck/pull/2020) Fix navigation issue with leftover nodes @juliushaertl
* [#2021](https://github.com/nextcloud/deck/pull/2021) Fix description issues @juliushaertl
* [#2022](https://github.com/nextcloud/deck/pull/2022) Fix replyto issues with the comments API @juliushaertl
* [#2027](https://github.com/nextcloud/deck/pull/2027) Allow to unassign current user from card @juliushaertl
* [#2029](https://github.com/nextcloud/deck/pull/2029) Fix wording : stack -> list @cloud2018
* [#2032](https://github.com/nextcloud/deck/pull/2032) Force order by id as second sorting key @juliushaertl
* [#2045](https://github.com/nextcloud/deck/pull/2045) Improve label styling @juliushaertl
* [#2010](https://github.com/nextcloud/deck/pull/2010) User documentation fixes @Nyco
* [#1998](https://github.com/nextcloud/deck/pull/1998) Add Checklist explaination to the doc @4rnoP


## 1.0.2 - 2020-06-03

### Fixed

* [#1774](https://github.com/nextcloud/deck/pull/1774) Remove deprecated global API calls
* [#1918](https://github.com/nextcloud/deck/pull/1918) Save compact mode on localstorage @jakobroehrl
* [#1919](https://github.com/nextcloud/deck/pull/1919) Show sidebar after card creation @jakobroehrl
* [#1924](https://github.com/nextcloud/deck/pull/1924) Boards ordered in main page @jakobroehrl
* [#1925](https://github.com/nextcloud/deck/pull/1925) Fix generated fronted urls
* [#1944](https://github.com/nextcloud/deck/pull/1944) Move navigation to @nextcloud/vue components
* [#1945](https://github.com/nextcloud/deck/pull/1945) Fix datetime picker
* [#1946](https://github.com/nextcloud/deck/pull/1946) Fix translations
* [#1976](https://github.com/nextcloud/deck/pull/1976) Delete boards that users own once they are deleted
* [#1977](https://github.com/nextcloud/deck/pull/1977) Redirect from previously used routes to the current ones

## 1.0.1 - 2020-05-15

### Fixed

* Removes debug filter output
* Labels are now sorted
* Stack title doesn't break up
* Fix move card modal
* Sort boards in navigation
* Fixes the attachment modal
* Handle deleted boards better
* User can only clone a board on canManage permissions
* Fix modal imports
* Show menu in compact mode
* Added a filter reset button
* Add hover effect to board list
* New filter icon
* Improve hovering response in board
* Enable linkify in description renderer @icewind1991
* Enhance board selector
* Fix issue if card description might be null
* Revert markdown styles from old frontend
* Do not scroll cards into view
* Fix reodering performance

## 1.0.0 - 2020-05-06

### Added

- Completly rewritten frontend
	- Better maintainability
	- Various small fixes
	- Unified user interface with Nextcloud
- Separate comment and activity timelines
- Add ability to reply to comments #1537
- Filter cards on board #1507 @jakobroehrl
- Add cards to projects #1294 @jakobroehrl
- Move cards to other boards #1242 @jakobroehrl
- Clone boards with existing stacks and labels #1221 @jakobroehrl
- Upload multiple files at once and in parallel

A huge thangs goes to our awesome community that put enourmous effort into the frontend migration:

Special thanks for contributing huge parts of the Vue.js migration:
@jakobroehrl @weeman1337 @nicolad

Testers/reporters:
@cloud2018 @putt1ck @bpcurse

Android app team for helping to improve our REST API:
@desperateCoder @stefan-niedermann

## 0.8.0 - 2020-01-16

### Added
- Case insensitive search (@matchish)

### Fixed
- Fix reversed permissions for reordering stacks (@JLueke)
- Fix reversed visibility of 'add stack' field (@JLueke)
- Fix occ export command
- Fix error causing cron execution to fail
- Fix activity entry on moving cards
- Proper wording in activity timeline (@a11exandru)

## 0.7.0 - 2019-08-20

### Added
- Make deck compatible to Nextcloud 17
- Allow to set the description when creating cards though the REST API

## 0.6.6 - 2019-08-01

### Fixed
- Bump security related dependencies

## 0.6.5 - 2019-07-28

### Fixed
- Fix attachment upload/delete failures
- Bump dependencies

## 0.6.4 - 2019-06-30

### Fixed
- Restore stable15 compatibility

## 0.6.3 - 2019-06-30

### Fixed
- Fix issues with comments and activity stream
- Fix setting archived state through API
- Fix type of acl in API responses
- Fix type mismatch with fulltext search

## 0.6.2 - 2019-05-15

### Fixed
- Fix group limit for nonexisting groups
- Only map circle ACLs if the app is enabled
- Fix updating sharing permissions
- Add app version to capabilities

## 0.6.1 - 2019-04-27

### Fixed
- Fix issue with boards not being shown after update
- Fix board selection in projects view outside of deck
- Remove collections text from sidebar
- Remove leftover use statement

## 0.6.0 - 2019-04-23

### Added
- Share boards with circles
- Integration with collections in Nextcloud 16
- Support for full text search
- Nextcloud 16 compatibility

### Fixed
- Fix duplicate call to delete
- Prevent duplicate tag names @jakobroehrl
- Prevent loading details when editing the card title @jakobroehrl
- Hide sidebar after card deletion @jakobroehrl
- Update labels after change in the UI @jakobroehrl
- Allow limiting the app to groups again
- Various REST API enhancements and fixes
- Fix some issues with comments/activites


## 0.5.2 - 2018-12-20

### Fixed
- Mark notification as read if a card with duedate gets archived
- Use proper timezone and locale format for due date activities
- Various translation fixes and updates
- Check group limit properly
- Fix comment activities on Nextcloud 15
- Fix issues with Edge
- API: Fix numeric types that were returned as strings
- API: Fix If-Modified-Since header parsing  


## 0.5.1 - 2018-12-05

### Added
- Separate settings for description changes in activity
- Less verbose description change activities
- Use server settings to restrict sharing to groups
- Add setting to exclude groups from creating their own boards

### Fixed
- Fix issue when using a separate table prefix @bpcurse
- Fix invalid activity parameters being published
- Wording fixes @cloud2018
- Improve loading performance by removing unused activity preloading
- Fix timestamp issues in deleted items tab
- Remember show state of the board navigation @weeman1337
- Add optional classes for custom styling @tinko92
- Fix missing details on activity emails
- Fix unrelated comments in board activity list
- Fix search not working properly
- Trigger comment notification on update only


## 0.5.0 - 2018-11-15

### Added

- Activity stream for board and cards
- Comments on cards
- Use users locale format on date picker
- Compact display mode
- Card title inline editing
- REST API
- Empty content view for board lists
- Undo for card and stack deletion
- Show tag name on board
- Notify users about card assignments
- Add shortcut to assign a card to yourself
- Improved view for printing
- Support for Nextcloud 15

### Fixed

- Accesibility improvements
- Don't allow empty card titles
- Improved checkbox handling in markdown


## 0.4.0 - 2018-07-11

### Added

- Attach files to cards
- Embed attachments into the card description
- Color picker to use any color value for board and labels
- Support for checkboxes inside the description
- occ command to export user data as JSON

### Fixed

- Improve frontend data management
- Fix bug the user list being empty on some occasions

## 0.3.0 - 2018-01-12

### Added
- Allow to assign users to cards
- Emit notifications for overdue cards
- Emit notifications if boards gets shared to a user
- Add support for Nextcloud 13
- Simplify layout for cleaner user experience
- Add contacts menu to avatars
- Automatically save card description on inactivity


### Fixed
- Fix card dragging behaviour
- Fix scrolling and dragging on mobile
- Various fixes when data is not syncronized between different views
- Improved performance
- Update document title when renaming a board
- Automatically chose the least used color
- Improve accessibility
- Fix issue when assigning labels after creating them
- Allow to save tag changes with enter
- Fix bug when removing labels changed the color of the remaining ones
- Fix issues with auto saving of card descriptions


## 0.2.8 - 2017-11-26

### Fixed
- Drop support for NC 13, since that will only be supported by the next version of Deck

## 0.2.7 - 2017-11-10

### Fixed
- Fix bug that caused update to fail

## 0.2.6 - 2017-11-10

### Fixed
- Fix duedates not being updated with MySQL databases

## 0.2.5 - 2017-11-08

### Fixed
- Fix duedates not being saved with MySQL databases

## 0.2.4 - 2017-10-08

### Fixed
- Fix card action menu not being accessible

## 0.2.3 - 2017-09-23

### Fixed
- Fix delete stack button being not available
- Fix acl issues with PostgreSQL

## 0.2.2 - 2017-09-07

### Fixed
- Various frontend fixes
- Fix sidebar drag issues
- Improvements for IE11 
- Fix bug when draging a card to an empty stack

## 0.2.1 - 2017-07-04

### Added
- Editing board details in board list
- Due date on mouse over

### Changed
- Polished label editor
- Polished sidebar
- UI improvements in board view
- Moved to SCSS

### Fixed
- Fix opacity of last entry in board list

## 0.2.0 - 2017-06-20

### Added
- Due dates for cards
- Archive boards
- Filter board list for archived/shared boards
- Rearange stack order
- Improved card overview with description indicator
- Navigation sidebar visibility can be toggled

### Fixed
- Undo on delete for boards
- Various fixes for mobile devices
- UI improvements to fit the Nextcloud design

## 0.1.4 - 2017-05-04

### Fixed
- Avoid red shadow on input in firefox
- Fix broken delete function for boards
- Fix broken board loading when groups were used for sharing
- Fix bug when users/groups got deleted

## 0.1.3 - 2017-05-01

### Added
- Icon to show if a card has a description

### Changed
- Use OCS API to get users/groups for sharing
- Various UI improvements
- Show display name instead of uid
- Fix bugs with limited field length
- Automatically hide sidebar when clicking the board view
- Start editing from everywhere in the description section


## 0.1.2

### Added
- Add translations

### Fixed
- Fix issues with Acl checks
- Always select first color fixes
- Add active class to appmenu
- Use server select2 styles
- Remove debug logging and unused function
- Fix issue while sorting cards
- Improve logging of exceptions
- Fixed SQL statements without prefixes

## 0.1.1

### Fixed
- Various styling improvements
- Fix problems with MySQL and PostgreSQL 
- Select first color by default when creating boards
- Fix error when changing board permissions

## 0.1.0

### Added
- Sharing boards with other users
- Create and manage boards 
- Sort cards on stacks by drag-and-drop
- Assign labels
- Markdown notes for each card
- Archive cards 

