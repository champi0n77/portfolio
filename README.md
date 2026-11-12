# Student Portfolio and Academic Planner

**Champion Iwuchukwu**  
COS 106 – Introduction to Web Technologies, MIVA Open University

## Technologies Used

- **HTML:** Structures the five pages and their content, forms and navigation.
- **CSS:** Styles the pages using a shared stylesheet and responsive layouts.
- **JavaScript:** Controls the mobile menu, academic planner and contact form validation.

## Development Process

I structured the pages with semantic HTML elements, including headers, navigation, main content and footers. I used `css/style.css` for shared colours, typography, navigation and responsive Grid and Flexbox layouts. JavaScript in `js/planner.js` manages the task list and updates the page, while `js/contact.js` checks the contact form fields before showing a validation result.

## Website Features

- **Home:** My name, photograph, brief introduction and links to the other pages.
- **About:** My studies, career ambition, skills, hobbies and interests, with a skills table and an audio sample.
- **Projects:** Three described entries: this portfolio, the academic planner and a basketball dashboard concept. The dashboard is not a working application; its link is a placeholder. The previews are illustrations, not screenshots.
- **Academic Planner:** Adds tasks with a title and description, marks them complete, filters them and deletes them. Tasks are saved in browser storage when available.
- **Contact:** Checks that the name, email, phone number and message are present, the email has a valid format and the phone number contains only digits. This is a validation demo; it does not send or store messages.

## Technical Requirements Demonstrated

- **HTML:** Semantic page elements, forms, a table on the About page, a profile image, hyperlinks, ordered and unordered lists, and an audio element.
- **CSS:** An external stylesheet, media queries, Grid and Flexbox layouts, consistent navigation styling and colours, and transitions. The layouts are designed for mobile and desktop; visual testing across devices remains to be completed.
- **JavaScript:** Event listeners, DOM manipulation, form validation, dynamic task updates, an array and reusable functions for task management.

The assignment requests project images or screenshots. The project entries currently use illustrated previews rather than screenshots; whether these meet that requirement should be confirmed. The assignment overview also mentions academic achievements, but none are listed on the site.

## How to Run the Project

Open the [live website](https://champi0n77.github.io/portfolio/index.html), or run a local copy from the project directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html` in a browser. The GitHub Pages site deploys from `main` and may not yet reflect changes in this working copy.

## Project Links

- **GitHub repository:** [https://github.com/champi0n77/portfolio](https://github.com/champi0n77/portfolio)
- **Live website:** [https://champi0n77.github.io/portfolio/index.html](https://champi0n77.github.io/portfolio/index.html)
