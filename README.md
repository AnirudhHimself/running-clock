# Running Clock

A stopwatch page without ads.

[![Netlify Status](https://api.netlify.com/api/v1/badges/89a75ce9-7a2f-4bc5-ab99-efbf4a5e99e9/deploy-status)](https://app.netlify.com/sites/runningclock/deploys)

## Introduction

I created this because I like having a tab on my browser open that displays a running clock. It's a React page with a single route that has a stopwatch. It saves the state of the stopwatch in local storage, so the elapsed time continues to tick if the page is refreshed, or the tab is closed. As time ticks, it updates the document title so you always know how much time has gone by.

Most of the logic to format and display the elapsed time is in the Clock component. The logic for counting the elapsed time is in the Stopwatch component.

## Roadmap (of sorts)

Just some thoughts on ways to expand the functionality of this project.

- Maintain a history of times. Have the ability to "resume" from a previous time.
- Functionality for other types of clocks (such as pomodoro and countdown).
- Implement alternate color themes. (Not just light and dark. It should be user customizable).
- Add ability to store other data such as notes, task lists, goals.
- Encrypt notes data that's stored locally.
- Come up with a project description and title that's actually good. Like come on, the clock is not physically running anywhere. What does it even mean.
