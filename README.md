# 2026 Sound Keyboard — author instructions

Visitors only play your curated clips. They cannot upload, replace, or assign sounds.

## Open
Double-click index.html. Keep index.html, style.css, script.js, and your media folder together. No installation or server is required.

## Assign the sounds before sharing
1. Create a folder named media beside index.html.
2. Put your audio/video clips there. MP4 (H.264/AAC) and MP3 are commonly supported; exact playback depends on the browser and file encoding.
3. Edit SOUNDS at the top of script.js:

```js
const SOUNDS = {
  A: { title: 'Your verified clip title', src: 'media/a.mp4', note: 'A short description.' },
  B: { title: 'Another sound', src: 'media/b.mp3', note: 'A short description.' }
};
```

Use uppercase A–Z. Add entries for any letter; keep src empty for unavailable clips. Relative paths make the folder portable, including when index.html is opened directly. Refresh the page after editing. Share the entire folder, including media. No clips are saved in browser storage.

## Current content status
No local media files are included. Initial research ideas were:
- A: year-end “And… 2026… end” narration.
- E: Adéla / Nicole Kidman “Every…” segment.
- N: Obsession “No” scene.

See the curated preset update below for current assignments and connected sources.

## Visitor controls
Press A–Z on your physical keyboard. There is no on-screen keyboard. A new key interrupts the previous clip. Repeated keydown events are ignored. Press the same letter to restart its clip; Escape stops playback. Unavailable keys show an honest coming-soon state.

## Curated preset update — November 17, 2026
The requested shortlist is now assigned in SOUNDS: A–G, I–J, L–P, R–W, Y. H/K/Q/X/Z remain open. These labels are candidate assignments, not a claim that all clips have been verified or acquired.

Two platform embeds are connected:
- E: @riversmomm’s TikTok trend example: https://www.tiktok.com/@riversmomm/video/7682869113043029261 . Source discovery: https://www.bevyl.ai/trends/adela-nicole-kidman . This is an attributed user post using the song, not the artist’s original upload. The official ADÉLA video at https://www.youtube.com/watch?v=3sB4Iv_tM7U returned “This video is unavailable” in the embedded player during testing, so it is not the active source.
- N: Universal Pictures original TikTok scene: https://www.tiktok.com/@universalpics/video/7642453175194225934 . Original-post provenance: https://knowyourmeme.com/memes/no-no-no-dont-do-that-i-thought-we-were-having-a-nice-date-obsession

No media was downloaded or extracted. Online frames require internet and provider permission. They may be blocked by privacy settings, region, platform availability, autoplay policy, or embedding restrictions. Use Open original when needed. YouTube often requires an HTTP referrer; when index.html is double-clicked, use Open original or view through a local web server. Local src files still work directly from index.html without a server. Do not interpret connected-source count as verified successful playback.

A’s exact 2026 narration could not be verified from an original playable source. Template-search pages were not treated as real clips. Remaining candidates have labels but no fabricated paths or replacement sounds.

### Verification
N’s Universal Pictures player was observed playing with the N key highlighted. E’s attributed TikTok example was observed playing to completion; its volume control successfully changed from muted/0 to unmuted/100. Browser autoplay can initially mute a clip, so visitors may need to unmute in the platform player. When focus is inside a third-party frame, physical keyboard shortcuts belong to that frame; click the page heading or background to return focus to the page before using letter keys or Escape. The page cannot intercept keys inside a cross-origin player.


## Minimal homepage redesign
One viewport with no page scrolling: small heading, large video area, brief hint/status, and a subtle current-letter indicator. No on-screen keys, deck panel, upload controls, or assignment UI. Only physical A–Z keys trigger clips. Escape removes the current embedded player and stops the clip. A new letter removes the previous frame before mounting the next; held-key repeat events are ignored. Local videos use object-fit: contain. Platform embeds preserve their own player layout and branding.

E/N request autoplay on each key press and send the platform play command once ready. External playback still depends on internet, load time, provider availability, and browser autoplay/mute rules; instant audible playback cannot be guaranteed. Provider controls are left available for unmute/play. Clicking inside an external player transfers keyboard focus into its cross-origin frame, where the parent page cannot intercept keys. Click the page heading/background to resume letter shortcuts.

Desktop layout checked at 1470 × 775: document and body dimensions equal the viewport; zero page buttons or aside panels. Physical N → A → E switches correctly, with honest unavailable state for A.


## Sound-on playback fix
TikTok frames now explicitly load with autoplay=1, muted=0, and force_muted=0. On the provider’s ready event, the page sends the documented unMute command before play, to request audible playback instead of relying on the provider’s default mute state. Local media explicitly uses muted=false and volume=1. TikTok does not document a setVolume command; its own volume control remains available. Browser/provider policies may still reject audible playback.

Verification of the sound-on fix: after a physical N key press, the TikTok player showed Pause (playing), Mute unchecked, and Volume 100. This verifies the player output state, not the computer’s speaker/system volume.
E was also observed at Mute unchecked and Volume 100 after a physical key trigger, then reaching the end of playback. The fix was verified against player state in Chrome, not by recording or listening to system audio. No one-time sound button was added because explicit sound-on parameters plus unMute succeeded in this test. Held-key repeats remain ignored; switching removes the previous frame, and Escape was verified removing it.


L now uses the exact author-supplied TikTok https://www.tiktok.com/@gzvk.hr/video/7690978158341917972 (short link https://www.tiktok.com/t/ZPNJ9UdSV/), replacing the previous Landslide candidate. M remains Mind Blank.

A now uses the exact author-supplied clip https://www.tiktok.com/@sammylevitt/video/7707440150988606733 (short link https://www.tiktok.com/t/ZPNJ99rn5/). L and other assignments are unchanged.

G now uses the author-supplied clip https://www.tiktok.com/@moonlitlyr1cs/video/7631218820106997014 (https://www.tiktok.com/t/ZPNJxevYT/). Other assignments are unchanged.

## Codex in-app audio investigation
The earlier Chrome volume-100 checks did not establish sound in Codex. In the actual Codex in-app browser, N was reproduced playing at muted=true, volume=0 despite sound-on parameters. TikTok's documented API offers unMute but no setVolume command, and the parent page cannot directly change a cross-origin video's volume. Do not treat browser-specific checks as proof of audible output in another browser.

Players are now retained per letter within the page session, paused and hidden on switching instead of recreated. Muted/zero-volume reports pause playback and instruct the visitor to use that clip's provider speaker/volume control. There is no generic sound-unlock button. This may require a first interaction for each clip, rather than one universal unlock. Reloading resets the retained players. Locally supplied MP4/MP3 files are the direct path to reliable physical-key playback: set a mapping's src to media/a.mp4 and remove its provider/id fields, preserving source attribution as appropriate. No remote media has been extracted or substituted.

Actual in-app verification: N initially had Volume 0. After using its native volume slider to set 100 and Play, switching N → E → N restarted N at Mute off / Volume 100. E still showed Volume 0, so the interaction did not unlock all clips. Retention solves losing a clip’s manual volume adjustment during this page session, but does not solve first-press audible playback for every TikTok clip. For a dependable keyboard instrument, replace the embeds with legitimately obtained local media files (media/a.mp4, media/e.mp4, media/g.mp4, media/l.mp4, media/n.mp4) via src. Do not claim fully fixed from this partial result.

G replaced with latest author-supplied clip https://www.tiktok.com/@temper.city/video/7610897192114588958 (https://www.tiktok.com/t/ZPNJxT9oh/). All other mappings and retained-player audio handling preserved.

S now uses https://www.tiktok.com/@lukeb.72/video/7648830036279119117 (https://www.tiktok.com/t/ZPNJxEY2C/). All other mappings preserved. The website runs with index.html, style.css and script.js only; Python was used as an editing/optional preview tool, not an application runtime dependency.

J now uses https://www.tiktok.com/@arminn.ai/video/7707458177075301653 (https://www.tiktok.com/t/ZPNJCraRk/). All other assignments, portrait layout and retained-player audio handling are unchanged.

X now uses https://www.tiktok.com/@spacex_updates/video/7707735108110929204 (https://www.tiktok.com/t/ZPNJXfPGw/). J and all other mappings are unchanged.

## Candidate sources — latest verified status
Nine external TikTok sources connected. No media files downloaded. These are attributed example posts, not necessarily original sound creators. First-key audible playback is still limited by provider mute/volume behavior in Codex.
- C: Can I interest you in something called me — https://www.tiktok.com/@hellorealtyco/video/7671051951924186399 (research: https://socialbee.com/blog/trending-tiktok-songs/)
- D: Do not bother the botherer — https://www.tiktok.com/@katiee_chandler/video/7699463732585418006 (research: https://buffer.com/resources/trending-songs-tiktok/)
- F: FREAKED OUT — https://www.tiktok.com/@ori.ashe/video/7668468440511958303 (research: https://overshot.io/video/7668468440511958303)
- M: Mind Blank — https://www.tiktok.com/@xiaomipakistan/video/7668228602705546497 (research: https://socialbee.com/blog/trending-tiktok-songs/)
- O: Oh no, I’m so cringe — https://www.tiktok.com/@borningblueberry/video/7700371652625911053 (research: https://buffer.com/resources/trending-songs-tiktok/)
- R: Ramalama Bang Bang — https://www.tiktok.com/@haleyybaylee/video/7702928801818250510 (research: https://socialbee.com/blog/trending-tiktok-songs/)
- T: This Is the Life — https://www.tiktok.com/@dr.tpl_/video/7621790970421497102 (research: https://www.bevyl.ai/trends/this-is-the-life-hannah-montana)
- U: Upside Down — https://www.tiktok.com/@mannanebesnnaya/video/7689832929630932231 (research: https://www.trendsbymasterhooks.com/articles/upside-down-tiktok-transition-trend)
- W: Why Would I Deceive You — https://www.tiktok.com/@marlacatheriine/video/7706608272261893406 (research: https://buffer.com/resources/trending-songs-tiktok/)
- Y: You Need to Learn How to Say No — https://www.tiktok.com/@cafesolmeridiana/video/7444625123736390955 (research: https://www.bevyl.ai/trends/you-need-to-learn-how-to-say-no) — UNAVAILABLE; candidate title retained, player disabled pending replacement.

Verification: C/D/F/M/R/T/W loaded TikTok player controls. O loaded earlier with provider controls. U replaces an unavailable YouTube upload with a TikTok transition example; its player controls loaded with volume 0. Y’s linked example returned “Video currently unavailable,” so it is not mounted as a working player. H/K/Q/Z remain open. Several loaded players reported volume 0; R/W reported volume 100 during testing. Source availability does not establish audible output.

## Final selected set
Only A, B, E, G, I, J, L, N, P, S, V, X remain assigned. All other mappings were removed and their key presses are ignored. The side guide displays the available physical keys and highlights the selected key. Footer status is visually hidden (retained for assistive technology); the Escape hint was removed. Escape still stops playback. Existing clip sources and playback behavior are preserved.

Space plays or resumes the selected clip. After Escape, Space restarts the last selected letter. Choose a letter first. Provider volume restrictions still apply.
