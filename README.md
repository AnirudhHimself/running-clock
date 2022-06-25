# Running Clock
[![Netlify Status](https://api.netlify.com/api/v1/badges/89a75ce9-7a2f-4bc5-ab99-efbf4a5e99e9/deploy-status)](https://app.netlify.com/sites/runningclock/deploys)

## Key Features  
⚡ Not Blazingly Fast.  
🦅 Not Fully Featured.  
🐮 Literally just a stopwatch.  

But hey, no ads!

## Overview

When working on my computer, I've always had a tab on my browser open that has a running stopwatch. I've had this strange time anxiety where I need to know how long it's been since I've started something. The stopwatch tab I was using before started showing ads, so I thought it was time to make my own. It's a Svelte page with a single route that has a stopwatch. It saves the state of the stopwatch in local storage, so the elapsed time continues to tick if the page is refreshed, or the tab is closed. As time ticks, it updates the document title so the elapsed time is always visisble.

Much of the logic to format and display the elapsed time is in the Stopwatch and ClockDisplay components. The logic for counting the elapsed time is in the Stopwatch component. It handles drift from setInterval, and was over-engineered to handle situations where the page was open in multiple tabs. By a sheer stroke of luck, I chose `Date.now()` to help calculate elapsed time. Since that uses UTC, it means that this will correctly work across timezones. (The expected behavior when a user travels accross timezones, is to show the amount of time that was experienced and won't add or subtract an hour that the user experiences of timezone differences).

## Ideas for Enhancements

- Functionality for other types of clocks (such as pomodoro and countdown).
- Maintain a history of times. Have the ability to "resume" from a previous time.
- Implement user customizable color themes.
- Come up with a project title and description that's actually good. Like come on, the clock is not physically running anywhere. What does it even mean.

This was made with an expected user base of one, so it should be no surprise to read that I plan on implementing absolutely none of these enhancements for this project. I only need a stopwatch. So, I'll just let it be a stopwatch.
