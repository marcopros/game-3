Exergame Assignment - Game +



1. Introduction
Name: Grand Theft Cardio 
Purpose: Increase motivation for physical activity through territorial gamification, combat sedentariness, and make cardiovascular exercise more engaging.
Exercise: Outdoor running, jogging, brisk walking – moderate to vigorous aerobic activity.
Platform: Mobile (iOS and Android) with smartwatch integration.
Short Description: An exergame that transforms every run into a global competition for territorial conquest. Users capture real territory on the map while running, compete with other runners to control city zones, and climb live leaderboards.
Technology:
GPS tracking for mapping routes.
HealthKit/Google Fit integration.
Cloud backend for live multiplayer competition.
Smartwatch integration (Apple Watch, Garmin, Suunto, Polar, Coros).
Overlay mapping system.

2. Theory Application (max 1000 words)
Dual-Flow Model (Sinclair et al., 2007)
Psychological flow => territory difficulty scales with fitness level (beginners: 0.3 km²/km, advanced: 0.15 km²/km) maintaining challenge-skill balance during 20-40 minute runs, preventing flow disruption from mismatched difficulty.
Physiological flow => pace-based capture rates incentivize moderate-vigorous intensity (65-85% HRmax): 1.0x multiplier at 6:00 min/km, 1.3x at 5:00 min/km, 1.5x at 4:30 min/km, aligning game rewards with ACSM aerobic exercise guidelines.
Adaptive coupling => heart rate monitoring triggers 40% capture rate reduction when intensity drops below moderate threshold (<64% HRmax), creating feedback loop maintaining both flows simultaneously—addressing core exergame challenge of "fun AND fitness."
Self-Determination Theory (Ryan et al., 2006)
Autonomy => no mandatory login times or daily quests; players freely choose territories to target, running schedules, and conquest vs. defense strategies. Route suggestions never prescribed, preserving voluntary participation crucial for intrinsic motivation.
Competence => adaptive territory capture rates maintain optimal challenge across skill levels. Progress visualization (7-day and 30-day trends for distance/territory/pace) provides clear performance feedback satisfying competence growth needs.
Relatedness => asynchronous territorial competition enables social connection without scheduling constraints. Alliance system (2-4 players sharing territory control) fosters belonging. Strava integration connects broader running community while maintaining game-specific social dynamics.
Avoiding extrinsic undermining is also crucial: monthly prizes use territory as competition entries (not purchases), preventing pay-to-win that undermines intrinsic motivation. Premium features offer convenience (analytics) rather than competitive advantage.
GameFlow Model (Sweetser & Wyeth, 2005)
Concentration => minimalist UI displays only essential info (pace, territory status). Haptic feedback for boundaries reduces visual distraction from physical activity.
Challenge => multi-tiered objectives provide scalable goals: neighborhood conquest (2-3 weeks), district dominance (1-2 months), regional ranking (long-term). Monthly resets balance new player access with all-time veteran recognition.
Player Skills => 3-run tutorial in "safe zones" (parks) teaches mechanics before competitive play. Skill develops naturally through gameplay.
Control => pause/resume without penalty, manual defense priority setting, mid-run mode switching (conquest/defense/exploration), adjustable notifications—implementing player agency over experience.
Clear Goals => pre-run explicit objectives ("Capture 2.5 km² in District North"). Post-run summary quantifies achievements with visual map overlay.
Feedback => real-time territory color changes, capture animations, audio boundary cues. Detailed post-run statistics (pace by territory, attack/defense rates, comparative performance).
Immersion => real-world space as game board creates spatial presence—players physically occupy conquered territory. Personalized naming and custom colors deepen psychological investment.
Social Interaction => live leaderboards during runs, post-run territory comparisons, weekly heat maps showing active competition zones.
Malone's Framework (1980)
Challenge => dynamic defense formula creates uncertain outcomes: defense_strength = (days_held × cumulative_km × recency_bonus) ÷ (attacker_distance × pace_advantage). Recent captures are vulnerable; long-held territories require significant effort to conquer—maintaining outcome uncertainty as motivational driver.
Fantasy => 
Intrinsic fantasy: the territorial conquest metaphor is directly linked to real-world running—players expand their 'athletic empire' only by physically running through new city zones. Becoming a 'Territory Runner' and dominating the map depends entirely on actual performance: to gain or defend territory, users must improve real endurance and consistency. For example, claiming a neighborhood requires more running than rivals, so the fantasy directly reinforces exercise.
Extrinsic fantasy: the game adds a strategic battlefield narrative with visual effects, titles (like 'King/Queen of the Park'), and conquest animations. These narrative and decorative elements make the experience more engaging and memorable, but are not essential to the core mechanics. Earning a virtual crown or seeing your territory colored on the map adds satisfaction and status, even though it does not affect the physical challenge itself.


Curiosity => 
Sensory: unexplored territories shown as fog-of-war; first capture triggers reveal animation and 1.5× value bonus, incentivizing route variation.
Cognitive: strategic uncertainty (consolidate vs. spread?), opponent predictions, territory value calculations engage mentally without cognitive overload during exertion.
Octalysis Framework (Chou, 2021)
Epic Meaning (CD1) => recognized "King/Queen" of geographic area via visible map dominance and local champion status creates aspirational identity.
Development & Accomplishment (CD2): tiered badges at 10/50/100/250 km² thresholds. Weekly summaries quantify multi-dimensional progress (distance, territory, ranking).
Ownership (CD4) => player username and custom flag colors displayed on held territories visible to all users. Loss notifications leverage endowment effect motivating defensive runs. Cumulative statistics (total km² held, longest-held territory) build possession sense.
Social Influence (CD5) => monthly local leaderboard resets encourage new players; all-time hall-of-fame celebrates veterans. Territory takeover notifications create direct competitive relationships. Alliance gifting enables positive social dynamics.
Scarcity (CD6) => limited territory in dense areas creates resource competition. High-value strategic zones (city centers, parks, landmarks) are scarce achievements signaling status.
Unpredictability (CD7) => variable territory values based on invisible factors (historical activity, strategic position, time multipliers) create unpredictable rewards. Random "territory bonus events" (2× value zones for 24 hours) combat routine staleness.
Evidence from Exergame Research
Design informed by empirical literature:
Pokémon GO lessons (Wang, 2021): primary quit reasons were "too much time/effort" (31%) and "slow progress" (28%). Addressed through: (1) meaningful progress in 15-20 minute minimum sessions vs. hour-long requirements, (2) guaranteed capture every run vs. random spawns, (3) strategic depth beyond collection mechanics.
Exergamification effectiveness (Matallaoui et al., 2017): systematic review found 3-5 game mechanics showed fully positive effects. Grand Theft Cardio implements 7 mechanics (avatar progression, points, leaderboards, territorial ownership, social competition, badges, narrative) across multiple psychological outcomes to maximize effectiveness.
Novelty prevention: unlike Pokémon GO's completion endpoint (Pokédex), territorial competition is infinite. Continuous turnover via decay and monthly resets prevent motivation decline that caused 42% of players to quit after achieving collection goals.
Expected Usage Impact
Theory-driven predictions:
Frequency increase: territory decay (2% daily) necessitates runs every 3-4 days, creating autonomy-preserving commitment devices. SDT predicts better adherence than rigid daily requirements.
Enhanced exploration: Malone's curiosity + 1.5× first-capture bonus predicts route variation. Pokémon GO research (70% discovered new locations) supports territorial grid's exploration incentives through strategic adjacency advantages.
Long-term adherence: dual-flow adaptive difficulty prevents boredom (challenge too low) or anxiety (challenge too high) causing exergame abandonment. Progressive challenges scale with fitness improvements.
Social adoption: SDT relatedness + Octalysis social drive predict asynchronous competition lowers barriers vs. synchronous requirements. Alliance mechanics target cooperative-preferring users.

3. Game Design Document
Health Effect Target
Improved cardiovascular fitness (cardiorespiratory endurance).
Increased overall physical activity level.
Reduced sedentariness.
Support for weight management through regular aerobic exercise.
Story
The player is a "Territory Runner" in a global competition to control cities. Every run is a mission to expand domain, defend conquests, and climb the ranks to become the local or global ruler.
Characters
The Runner (Player): Customizable avatar with stats (km², territory defended, ranking).
Competitor Runners: Other players displayed on the map as territorial "enemies".
Level/Environment Design
Game world: Real-world map based on GPS.
Territorial zones: Geographic grid (cells of about 1 km²) are conquerable.
Urban biomes: Visual differentiation between parks, downtown, suburbs.
Strongholds: Zones of high strategic value (city landmarks).
Gameplay
Core Loop:
Start run via app.
GPS tracks movement in real-time.
Crossed territory is conquered and colored on the map.
Territory overlay updates live during the run.
End of run: visualization of territory conquered/defended.
Upload stats, sync with Strava, leaderboard update.
Main Mechanics:
Territory Capture: Running through an uncontrolled zone claims it.
Territory Defense: Re-running owned territory reinforces it.
Territory Takeover: Running on another's territory can steal it (based on time/distance).
Strategic Route Planning: Choosing routes to maximize conquest or defend vulnerable zones.
Game Modes:
Free Run: Free running with territory capture.
Defend Mode: Focus on defending existing territory.
Expansion Mode: Focus on conquering new zones.
Training Plans: Structured programs with fitness goals.
Competitions:
Monthly Tournaments: Each km² = 1 entry for physical prizes.
Local Rankings: Leaderboards for city/region.
Global Rankings: Worldwide territory holders leaderboard.
Art
Stylized map with colored overlays for territories.
Minimalist in-run UI (performance focused).
Territory conquest/defense animations.
Color coding to distinguish own territory vs. competitors.
Sound and Music
Positive audio feedback for territory conquest.
Audio notifications for milestones (new km² won).
Alerts for territory under attack.
Integration of personal playlists during running.
User Interface, Game Controls
Pre-Run:
Main dashboard: territory map, stats, leaderboards.
Mode selection.
Display of daily training plan.
During Run:
Live map with territory overlay.
Essential stats (distance, pace, time, new territory).
Minimal controls (pause, stop, lap).
Post-Run:
Summary screen highlighting conquered territory.
Detailed stats (pace, splits, elevation).
Social sharing option.
Strava sync.
Smartwatch Interface:
Display run stats on watch.
Basic controls (start/stop).
Notifications for territory conquered.
Accessibility
Training plans for all levels (from absolute beginners to marathon runners).
Walking mode for users with limited mobility.
High-contrast UI for outdoor visibility.
Audio cues for visually impaired users.
Monetization
Freemium Model:
Free Tier:
Core gameplay (territory capture).
Basic GPS tracking.
Access to local leaderboards.
Monthly competitions.
Premium Subscription:
Advanced personalized training plans.
Detailed stats and analytics.
Real-time territory alerts.
Access to all special competitions.
Removal of territory cap.
Professional coaching support.
Additional Revenue:
Brand partnerships for competition prizes.
Local sponsors for "premium" territories.
Collaborations for city running events.

4. Concept
URL: [Insert YouTube unlisted video link – max 2 min]
Asset List
Original Assets Created:
[List original assets created for the video]
External Assets:
INTVL app screenshots: from INTVL PTY LTD (for concept reference)
Map overlays: [source]
UI mockup template: [source]
Audio/music: [source]
[Other assets with full attribution]

5. Reflection (max 250 words)
Developing this concept required careful balancing of intrinsic and extrinsic motivation. Applying Self-Determination Theory was crucial for designing mechanics that support autonomy, competence, and social relatedness without turning exercise into a purely reward-driven activity.
The main challenge was adapting territorial gamification mechanics while keeping the focus on physical health rather than pure gaming. Integrating the GameFlow model helped identify how to keep users in a state of flow during running—a demanding physical activity—through immediate feedback and calibrated challenges.
Applying the Octalysis Framework revealed how multiple core drives can work synergistically: the sense of ownership over conquered territory (Core Drive 4) combined with social competition (Core Drive 5) creates a powerful motivational loop that could support long-term exercise adherence.
Malone’s theory of curiosity proved especially relevant: the territorial mechanic encourages physical exploration of new urban areas, transforming the running routine into an ongoing adventure. This can address one of the main problems of exercise adherence: monotony.

6. References
Deterding, S., et al. (2011). "From Game Design Elements to Gamefulness: Defining Gamification"
Ryan, R. M., & Deci, E. L. "Self-Determination Theory and Video Game Motivation"
Sweetser, P., & Wyeth, P. (2005). "GameFlow: A Model for Evaluating Player Enjoyment in Games"
Malone, T. W. (1980). "What Makes Things Fun to Learn?"
Chou, Y. K. "The Octalysis Framework for Gamification & Behavioral Design"


