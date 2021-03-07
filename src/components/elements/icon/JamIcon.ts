//#region JamIcons
export type JamIcon =
  | '500px'
  | 'accessibility'
  | 'activity'
  | 'airbnb'
  | 'alarm-clock-f'
  | 'alarm-clock'
  | 'alert-f'
  | 'alert'
  | 'alien-f'
  | 'alien'
  | 'align-center'
  | 'align-justify'
  | 'align-left'
  | 'align-right'
  | 'amazon'
  | 'anchor'
  | 'android-circle'
  | 'android-square'
  | 'android'
  | 'aperture'
  | 'apple-circle'
  | 'apple-square'
  | 'apple'
  | 'archive-f'
  | 'archive'
  | 'arrow-circle-down-f'
  | 'arrow-circle-down-left-f'
  | 'arrow-circle-down-left'
  | 'arrow-circle-down-right-f'
  | 'arrow-circle-down-right'
  | 'arrow-circle-down'
  | 'arrow-circle-left-f'
  | 'arrow-circle-left'
  | 'arrow-circle-right-f'
  | 'arrow-circle-right'
  | 'arrow-circle-up-f'
  | 'arrow-circle-up-left-f'
  | 'arrow-circle-up-left'
  | 'arrow-circle-up-right-f'
  | 'arrow-circle-up-right'
  | 'arrow-circle-up'
  | 'arrow-down-left'
  | 'arrow-down-right'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-square-down-f'
  | 'arrow-square-down-left-f'
  | 'arrow-square-down-left'
  | 'arrow-square-down-right-f'
  | 'arrow-square-down-right'
  | 'arrow-square-down'
  | 'arrow-square-left-f'
  | 'arrow-square-left'
  | 'arrow-square-right-f'
  | 'arrow-square-right'
  | 'arrow-square-up-f'
  | 'arrow-square-up-left-f'
  | 'arrow-square-up-left'
  | 'arrow-square-up-right-f'
  | 'arrow-square-up-right'
  | 'arrow-square-up'
  | 'arrow-up-left'
  | 'arrow-up-right'
  | 'arrow-up'
  | 'arrows-corners'
  | 'arrows-fullscreen'
  | 'arrows-h'
  | 'arrows-v'
  | 'attachment'
  | 'background-color'
  | 'backpack-f'
  | 'backpack'
  | 'backward-circle-f'
  | 'backward-circle'
  | 'backward-square-f'
  | 'backward-square'
  | 'backward'
  | 'baidu-circle'
  | 'baidu-square'
  | 'baidu'
  | 'bandage-f'
  | 'bandage'
  | 'bar-chart'
  | 'baseball'
  | 'basketball'
  | 'bathtub-f'
  | 'bathtub'
  | 'battery-charging-f'
  | 'battery-charging'
  | 'battery-f'
  | 'battery-half-f'
  | 'battery-half'
  | 'battery-one-quarter-f'
  | 'battery-one-quarter'
  | 'battery-three-quarters-f'
  | 'battery-three-quarters'
  | 'battery'
  | 'beatport-circle'
  | 'beatport-square'
  | 'beatport'
  | 'beer-f'
  | 'beer'
  | 'behance-circle'
  | 'behance-square'
  | 'behance'
  | 'bell-f'
  | 'bell-off-f'
  | 'bell-off'
  | 'bell'
  | 'bing-circle'
  | 'bing-square'
  | 'bing'
  | 'birthday-cake-f'
  | 'birthday-cake'
  | 'blogger-circle'
  | 'blogger-square'
  | 'blogger'
  | 'bluetooth'
  | 'bold'
  | 'book-f'
  | 'book'
  | 'bookmark-f'
  | 'bookmark-minus-f'
  | 'bookmark-minus'
  | 'bookmark-plus-f'
  | 'bookmark-plus'
  | 'bookmark-remove-f'
  | 'bookmark-remove'
  | 'bookmark'
  | 'bottle-f'
  | 'bottle'
  | 'box-f'
  | 'box'
  | 'branch-f'
  | 'branch'
  | 'brightness-down-f'
  | 'brightness-down'
  | 'brightness-up-f'
  | 'brightness-up'
  | 'brightness'
  | 'browse'
  | 'brush-f'
  | 'brush'
  | 'bug-f'
  | 'bug'
  | 'building-f'
  | 'building'
  | 'bus-f'
  | 'bus'
  | 'cactus-f'
  | 'cactus'
  | 'calculator'
  | 'calendar-alt-f'
  | 'calendar-alt'
  | 'calendar-f'
  | 'calendar'
  | 'camera-alt-f'
  | 'camera-alt'
  | 'camera-f'
  | 'camera'
  | 'candle-f'
  | 'candle'
  | 'capsule-f'
  | 'capsule'
  | 'car-f'
  | 'car'
  | 'castle-f'
  | 'castle'
  | 'character'
  | 'check'
  | 'chevron-circle-down-f'
  | 'chevron-circle-down-left-f'
  | 'chevron-circle-down-left'
  | 'chevron-circle-down-right-f'
  | 'chevron-circle-down-right'
  | 'chevron-circle-down'
  | 'chevron-circle-left-f'
  | 'chevron-circle-left'
  | 'chevron-circle-right-f'
  | 'chevron-circle-right'
  | 'chevron-circle-up-f'
  | 'chevron-circle-up-left-f'
  | 'chevron-circle-up-left'
  | 'chevron-circle-up-right-f'
  | 'chevron-circle-up-right'
  | 'chevron-circle-up'
  | 'chevron-down-left'
  | 'chevron-down-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-square-down-f'
  | 'chevron-square-down-left-f'
  | 'chevron-square-down-left'
  | 'chevron-square-down-right-f'
  | 'chevron-square-down-right'
  | 'chevron-square-down'
  | 'chevron-square-left-f'
  | 'chevron-square-left'
  | 'chevron-square-right-f'
  | 'chevron-square-right'
  | 'chevron-square-up-f'
  | 'chevron-square-up-left-f'
  | 'chevron-square-up-left'
  | 'chevron-square-up-right-f'
  | 'chevron-square-up-right'
  | 'chevron-square-up'
  | 'chevron-up-left'
  | 'chevron-up-right'
  | 'chevron-up'
  | 'chevrons-circle-down-f'
  | 'chevrons-circle-down-left-f'
  | 'chevrons-circle-down-left'
  | 'chevrons-circle-down-right-f'
  | 'chevrons-circle-down-right'
  | 'chevrons-circle-down'
  | 'chevrons-circle-left-f'
  | 'chevrons-circle-left'
  | 'chevrons-circle-right-f'
  | 'chevrons-circle-right'
  | 'chevrons-circle-up-f'
  | 'chevrons-circle-up-left-f'
  | 'chevrons-circle-up-left'
  | 'chevrons-circle-up-right-f'
  | 'chevrons-circle-up-right'
  | 'chevrons-circle-up'
  | 'chevrons-down-left'
  | 'chevrons-down-right'
  | 'chevrons-down'
  | 'chevrons-left'
  | 'chevrons-right'
  | 'chevrons-square-down-f'
  | 'chevrons-square-down-left-f'
  | 'chevrons-square-down-left'
  | 'chevrons-square-down-right-f'
  | 'chevrons-square-down-right'
  | 'chevrons-square-down'
  | 'chevrons-square-left-f'
  | 'chevrons-square-left'
  | 'chevrons-square-right-f'
  | 'chevrons-square-right'
  | 'chevrons-square-up-f'
  | 'chevrons-square-up-left-f'
  | 'chevrons-square-up-left'
  | 'chevrons-square-up-right-f'
  | 'chevrons-square-up-right'
  | 'chevrons-square-up'
  | 'chevrons-up-left'
  | 'chevrons-up-right'
  | 'chevrons-up'
  | 'chronometer-f'
  | 'chronometer'
  | 'circle-f'
  | 'circle'
  | 'clear-format'
  | 'clipboard-f'
  | 'clipboard'
  | 'clock-f'
  | 'clock'
  | 'close-circle-f'
  | 'close-circle'
  | 'close-rectangle-f'
  | 'close-rectangle'
  | 'close'
  | 'cloud-f'
  | 'cloud-rain-f'
  | 'cloud-rain'
  | 'cloud-snow-f'
  | 'cloud-snow'
  | 'cloud-thunder-f'
  | 'cloud-thunder'
  | 'cloud'
  | 'code-sample'
  | 'code'
  | 'codepen-circle'
  | 'codepen-square'
  | 'codepen'
  | 'coffee-cup-f'
  | 'coffee-cup'
  | 'coffee'
  | 'cog-f'
  | 'cog'
  | 'cogs-f'
  | 'cogs'
  | 'coin-f'
  | 'coin'
  | 'color'
  | 'compass-f'
  | 'compass'
  | 'computer-alt-f'
  | 'computer-alt'
  | 'computer-f'
  | 'computer'
  | 'credit-card-f'
  | 'credit-card'
  | 'crop'
  | 'crown-f'
  | 'crown'
  | 'cutlery-f'
  | 'cutlery'
  | 'cutter-f'
  | 'cutter'
  | 'dashboard-f'
  | 'dashboard'
  | 'database-f'
  | 'database'
  | 'deezer-circle'
  | 'deezer-square'
  | 'deezer'
  | 'delete-f'
  | 'delete'
  | 'deviantart-circle'
  | 'deviantart-square'
  | 'deviantart'
  | 'dice-f'
  | 'dice'
  | 'dices-f'
  | 'dices'
  | 'differenciation'
  | 'digg'
  | 'direction-f'
  | 'direction'
  | 'directions-f'
  | 'directions'
  | 'disc-f'
  | 'disc'
  | 'discord'
  | 'disqus-circle'
  | 'disqus-square'
  | 'disqus'
  | 'dj-f'
  | 'dj'
  | 'dna'
  | 'document-f'
  | 'document'
  | 'door'
  | 'download'
  | 'dribbble'
  | 'drupal-circle'
  | 'drupal-square'
  | 'drupal'
  | 'ebay'
  | 'egg-f'
  | 'egg'
  | 'eggs-f'
  | 'eggs'
  | 'eject-circle-f'
  | 'eject-circle'
  | 'eject-square-f'
  | 'eject-square'
  | 'eject'
  | 'envelope-f'
  | 'envelope-open-f'
  | 'envelope-open'
  | 'envelope'
  | 'extinguisher-f'
  | 'extinguisher'
  | 'eye-close-f'
  | 'eye-close'
  | 'eye-f'
  | 'eye'
  | 'eyedropper-f'
  | 'eyedropper'
  | 'facebook-circle'
  | 'facebook-square'
  | 'facebook'
  | 'fast-backward-circle-f'
  | 'fast-backward-circle'
  | 'fast-backward-square-f'
  | 'fast-backward-square'
  | 'fast-backward'
  | 'fast-forward-circle-f'
  | 'fast-forward-circle'
  | 'fast-forward-square-f'
  | 'fast-forward-square'
  | 'fast-forward'
  | 'feather-f'
  | 'feather'
  | 'female'
  | 'file-f'
  | 'file'
  | 'files-f'
  | 'files'
  | 'filter-f'
  | 'filter'
  | 'fingerprint'
  | 'first-aid-f'
  | 'first-aid'
  | 'fish'
  | 'fiverr-circle'
  | 'fiverr-square'
  | 'fiverr'
  | 'flag-f'
  | 'flag'
  | 'flame-f'
  | 'flame'
  | 'flashlight-off-f'
  | 'flashlight-off'
  | 'flashlight-on-f'
  | 'flashlight-on'
  | 'flask'
  | 'flickr-circle'
  | 'flickr-square'
  | 'flickr'
  | 'flower'
  | 'folder-f'
  | 'folder-open-f'
  | 'folder-open'
  | 'folder-zip-f'
  | 'folder-zip'
  | 'folder'
  | 'football'
  | 'fork-f'
  | 'fork'
  | 'forward-circle-f'
  | 'forward-circle'
  | 'forward-square-f'
  | 'forward-square'
  | 'forward'
  | 'foursquare'
  | 'gamepad-f'
  | 'gamepad-retro-f'
  | 'gamepad-retro'
  | 'gamepad'
  | 'gamma'
  | 'ghost-f'
  | 'ghost-org-circle'
  | 'ghost-org-square'
  | 'ghost-org'
  | 'ghost'
  | 'gift-f'
  | 'gift'
  | 'github-circle'
  | 'github-square'
  | 'github'
  | 'gitlab-circle'
  | 'gitlab-square'
  | 'gitlab'
  | 'glass-empty'
  | 'glass-filled-f'
  | 'glass-filled'
  | 'glue-f'
  | 'glue'
  | 'google-circle'
  | 'google-play-circle'
  | 'google-play-square'
  | 'google-play'
  | 'google-plus-circle'
  | 'google-plus-square'
  | 'google-plus'
  | 'google-square'
  | 'google'
  | 'gps-f'
  | 'gps'
  | 'grid-f'
  | 'grid'
  | 'hairdryer-f'
  | 'hairdryer'
  | 'hammer-f'
  | 'hammer'
  | 'hashtag'
  | 'header-1'
  | 'header-2'
  | 'header-3'
  | 'header-4'
  | 'header-5'
  | 'header-6'
  | 'header'
  | 'headset-f'
  | 'headset'
  | 'heart-f'
  | 'heart'
  | 'helmet-f'
  | 'helmet'
  | 'help-f'
  | 'help'
  | 'highlighter-f'
  | 'highlighter'
  | 'history'
  | 'home-f'
  | 'home'
  | 'hourglass-f'
  | 'hourglass'
  | 'ice-cream-f'
  | 'ice-cream'
  | 'id-card-f'
  | 'id-card'
  | 'inbox-f'
  | 'inbox'
  | 'inboxes-f'
  | 'inboxes'
  | 'indent'
  | 'infinite'
  | 'info-f'
  | 'info'
  | 'instagram'
  | 'instant-picture-f'
  | 'instant-picture'
  | 'intersection'
  | 'italic'
  | 'joystick-f'
  | 'joystick'
  | 'key-f'
  | 'key'
  | 'keyboard-f'
  | 'keyboard'
  | 'language'
  | 'layers-f'
  | 'layers'
  | 'layout-f'
  | 'layout'
  | 'leaf-f'
  | 'leaf'
  | 'lifebuoy-f'
  | 'lifebuoy'
  | 'lightbulb-f'
  | 'lightbulb'
  | 'line'
  | 'link'
  | 'linkedin-circle'
  | 'linkedin-square'
  | 'linkedin'
  | 'log-in'
  | 'log-out'
  | 'ltr'
  | 'luggage-f'
  | 'luggage'
  | 'magic-f'
  | 'magic'
  | 'magnet-f'
  | 'magnet'
  | 'male'
  | 'map-f'
  | 'map-marker-f'
  | 'map-marker'
  | 'map'
  | 'mask-f'
  | 'mask'
  | 'medal-f'
  | 'medal'
  | 'medical'
  | 'medium-circle'
  | 'medium-square'
  | 'medium'
  | 'menu'
  | 'merge-f'
  | 'merge'
  | 'message-alt-f'
  | 'message-alt-writing-f'
  | 'message-alt-writing'
  | 'message-alt'
  | 'message-f'
  | 'message-writing-f'
  | 'message-writing'
  | 'message'
  | 'messages-alt-f'
  | 'messages-alt'
  | 'messages-f'
  | 'messages'
  | 'messenger'
  | 'mic-alt'
  | 'mic-circle-f'
  | 'mic-circle'
  | 'mic-f'
  | 'mic-square-f'
  | 'mic-square'
  | 'mic'
  | 'microchip-f'
  | 'microchip'
  | 'minus-circle-f'
  | 'minus-circle'
  | 'minus-rectangle-f'
  | 'minus-rectangle'
  | 'minus'
  | 'moon-f'
  | 'moon'
  | 'more-horizontal-f'
  | 'more-horizontal'
  | 'more-vertical-f'
  | 'more-vertical'
  | 'mountain-f'
  | 'mountain'
  | 'move-alt'
  | 'move'
  | 'movie'
  | 'mug-f'
  | 'mug'
  | 'music-f'
  | 'music'
  | 'myspace-circle'
  | 'myspace-square'
  | 'myspace'
  | 'napster-circle'
  | 'napster-square'
  | 'napster'
  | 'newsletter-f'
  | 'newsletter'
  | 'newspaper-f'
  | 'newspaper'
  | 'npm'
  | 'odnoklassniki-circle'
  | 'odnoklassniki-square'
  | 'odnoklassniki'
  | 'opera-circle'
  | 'opera-square'
  | 'opera'
  | 'ordered-list'
  | 'orientaton'
  | 'padlock-alt-f'
  | 'padlock-alt-open-f'
  | 'padlock-alt-open'
  | 'padlock-alt'
  | 'padlock-f'
  | 'padlock-open-f'
  | 'padlock-open'
  | 'padlock'
  | 'page-break'
  | 'paper-plane-f'
  | 'paper-plane'
  | 'paragraph'
  | 'patreon-circle'
  | 'patreon-square'
  | 'patreon'
  | 'pause'
  | 'paypal-circle'
  | 'paypal-square'
  | 'paypal'
  | 'pen-f'
  | 'pen'
  | 'pencil-f'
  | 'pencil'
  | 'periscope-circle'
  | 'periscope-square'
  | 'periscope'
  | 'phone-f'
  | 'phone'
  | 'picture-edit'
  | 'picture-f'
  | 'picture'
  | 'pictures-f'
  | 'pictures'
  | 'pie-chart-alt'
  | 'pie-chart-f'
  | 'pie-chart'
  | 'pin-alt-f'
  | 'pin-alt'
  | 'pin-f'
  | 'pin'
  | 'pinterest-circle'
  | 'pinterest-square'
  | 'pinterest'
  | 'pizza-slice'
  | 'plane-f'
  | 'plane'
  | 'play-circle-f'
  | 'play-circle'
  | 'play-square-f'
  | 'play-square'
  | 'play'
  | 'plug-f'
  | 'plug'
  | 'plus-circle-f'
  | 'plus-circle'
  | 'plus-rectangle-f'
  | 'plus-rectangle'
  | 'plus'
  | 'pocket-watch-f'
  | 'pocket-watch'
  | 'podcast'
  | 'power'
  | 'printer-f'
  | 'printer'
  | 'qr-code'
  | 'quora-circle'
  | 'quora-square'
  | 'quora'
  | 'quote'
  | 'rainbow'
  | 'rec'
  | 'rectangle-f'
  | 'rectangle'
  | 'reddit'
  | 'redo'
  | 'refresh-reverse'
  | 'refresh'
  | 'repeat'
  | 'rocket-f'
  | 'rocket'
  | 'rss-feed'
  | 'rtl'
  | 'rubber'
  | 'ruler-f'
  | 'ruler'
  | 'save-f'
  | 'save'
  | 'scissors'
  | 'screen-f'
  | 'screen'
  | 'screwdriver-f'
  | 'screwdriver'
  | 'search-folder'
  | 'search-minus'
  | 'search-plus'
  | 'search'
  | 'select-all'
  | 'set-backward-circle-f'
  | 'set-backward-circle'
  | 'set-backward-square-f'
  | 'set-backward-square'
  | 'set-backward'
  | 'set-forward-circle-f'
  | 'set-forward-circle'
  | 'set-forward-square-f'
  | 'set-forward-square'
  | 'set-forward'
  | 'set-square-f'
  | 'set-square'
  | 'settings-alt'
  | 'share-alt-f'
  | 'share-alt'
  | 'share'
  | 'shield-check-f'
  | 'shield-check'
  | 'shield-close-f'
  | 'shield-close'
  | 'shield-f'
  | 'shield-half'
  | 'shield-minus-f'
  | 'shield-minus'
  | 'shield-plus-f'
  | 'shield-plus'
  | 'shield'
  | 'shopify-circle'
  | 'shopify-square'
  | 'shopify'
  | 'shopping-bag-alt-f'
  | 'shopping-bag-alt'
  | 'shopping-bag-f'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'shuffle'
  | 'signal'
  | 'sitemap-f'
  | 'sitemap'
  | 'skull-f'
  | 'skull'
  | 'skype-circle'
  | 'skype-square'
  | 'skype'
  | 'slack-circle'
  | 'slack-square'
  | 'slack'
  | 'smiley-f'
  | 'smiley'
  | 'snapchat-circle'
  | 'snapchat-square'
  | 'snapchat'
  | 'snowboard-f'
  | 'snowboard'
  | 'snowflake'
  | 'soundcloud'
  | 'speaker-f'
  | 'speaker'
  | 'spell-check'
  | 'spotify'
  | 'square-f'
  | 'square'
  | 'squarespace-circle'
  | 'squarespace-square'
  | 'squarespace'
  | 'stackoverflow-circle'
  | 'stackoverflow-square'
  | 'stackoverflow'
  | 'stamp-f'
  | 'stamp'
  | 'star-f'
  | 'star-full'
  | 'star-half-f'
  | 'star-half'
  | 'star'
  | 'station'
  | 'stop-sign'
  | 'stop'
  | 'store'
  | 'strikethrough'
  | 'stumbleupon-circle'
  | 'stumbleupon-square'
  | 'stumbleupon'
  | 'subscript'
  | 'subtraction'
  | 'sun-f'
  | 'sun'
  | 'superscript'
  | 'switch-left-f'
  | 'switch-left'
  | 'switch-right-f'
  | 'switch-right'
  | 'sword-f'
  | 'sword'
  | 'tab'
  | 'table-cell-merge'
  | 'table-cell'
  | 'table-col-after'
  | 'table-col-before'
  | 'table-delete'
  | 'table-left-header'
  | 'table-right-header'
  | 'table-row-above'
  | 'table-row-after'
  | 'table-top-header'
  | 'table'
  | 'tablet-f'
  | 'tablet'
  | 'tag-f'
  | 'tag'
  | 'tags-f'
  | 'tags'
  | 'target'
  | 'task-list-f'
  | 'task-list'
  | 'telegram'
  | 'temperature'
  | 'template'
  | 'terminal'
  | 'text'
  | 'thunder-f'
  | 'thunder'
  | 'ticket-f'
  | 'ticket'
  | 'tools-f'
  | 'tools'
  | 'torch-f'
  | 'torch'
  | 'totem'
  | 'train-f'
  | 'train'
  | 'transgender'
  | 'trash-alt-f'
  | 'trash-alt'
  | 'trash-f'
  | 'trash'
  | 'tree-alt-f'
  | 'tree-alt'
  | 'tree-f'
  | 'tree'
  | 'trello'
  | 'triangle-danger-f'
  | 'triangle-danger'
  | 'triangle-f'
  | 'triangle'
  | 'trophy-f'
  | 'trophy'
  | 'tube'
  | 'tumblr-circle'
  | 'tumblr-square'
  | 'tumblr'
  | 'twitch'
  | 'twitter-circle'
  | 'twitter-square'
  | 'twitter'
  | 'umbrella-closed-f'
  | 'umbrella-closed'
  | 'umbrella-f'
  | 'umbrella'
  | 'underline'
  | 'undo'
  | 'unindent'
  | 'union'
  | 'universe'
  | 'unlink'
  | 'unordered-list'
  | 'unsplash-circle'
  | 'unsplash-square'
  | 'unsplash'
  | 'upload'
  | 'user-circle'
  | 'user-minus'
  | 'user-plus'
  | 'user-remove'
  | 'user-square'
  | 'user'
  | 'users'
  | 'viadeo'
  | 'viber-circle'
  | 'viber-square'
  | 'viber'
  | 'video-camera-f'
  | 'video-camera-vintage-f'
  | 'video-camera-vintage'
  | 'video-camera'
  | 'vimeo-circle'
  | 'vimeo-square'
  | 'vimeo'
  | 'vine-circle'
  | 'vine-square'
  | 'vine'
  | 'voicemail'
  | 'volume-circle-f'
  | 'volume-circle'
  | 'volume-down-circle-f'
  | 'volume-down-circle'
  | 'volume-down-square-f'
  | 'volume-down-square'
  | 'volume-down'
  | 'volume-mute-circle-f'
  | 'volume-mute-circle'
  | 'volume-mute-square-f'
  | 'volume-mute-square'
  | 'volume-mute'
  | 'volume-square-f'
  | 'volume-square'
  | 'volume-up-circle-f'
  | 'volume-up-circle'
  | 'volume-up-square-f'
  | 'volume-up-square'
  | 'volume-up'
  | 'volume'
  | 'watch-f'
  | 'watch'
  | 'water-drop-f'
  | 'water-drop'
  | 'whatsapp'
  | 'wifi'
  | 'wikipedia'
  | 'wordpress'
  | 'world'
  | 'wrench-f'
  | 'wrench'
  | 'write-f'
  | 'write'
  | 'yahoo-circle'
  | 'yahoo-square'
  | 'yahoo'
  | 'yelp-circle'
  | 'yelp-square'
  | 'yelp'
  | 'youtube-circle'
  | 'youtube-square'
  | 'youtube';
//#endregion
