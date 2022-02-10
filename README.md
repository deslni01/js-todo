# The Odin Project 2

## Project: ToDo List

### Comments:

-   Built similar to the library, used it as some reference to get some stuff done.
-   As of right now, here's the functionality available: populate page with tasks; add tasks to page and array; change status to done/not done; delete item from page and array
-   So what's left?
    -   On display:
        -   Capitalize first letters
        -   Color `Priority` boxes
        -   Color `Status` boxes - or change all colors based on `Status`?
        -   On left side, `projects` list
    -   Misc:
        -   `date-fns` to change date format being used
    -   Style
    -   Put functions into a UI function for organization?
        -   Do event handlers go into a function like this, or do they have to stay outside? Module Pattern for event handlers?

### Remaining Tasks:

-   [x] JS
-   [x] HTML
-   [ ] Style the document
    -   [ ] Make purdy
-   [ ] Footer element - persistent with other personal projects
-   [ ] Take over the world

### Assignment:

-   Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.

-   Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a `title`, `description`, `dueDate` and `priority`. You might also want to include `notes` or even a `checklist`.

-   Your todo list should have `projects` or separate lists of `todos`. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.

-   You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

-   The look of the User Interface is up to you, but it should be able to do the following:

    -   view all projects

    -   view all todos in each project (probably just the title and duedate.. perhaps changing color for different priorities)

    -   expand a single todo to see/edit its details

    -   delete a todo

-   For inspiration, check out the following great todo apps. (look at screenshots, watch their introduction videos etc.)

    -   Todoist

    -   Things

    -   any.do

-   Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:

    -   `date-fns` gives you a bunch of handy functions for formatting and manipulating dates and times.

-   We haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their todos will disappear! You should add some persistence to this todo app using the Web Storage API.

    -   `localStorage` (docs here) allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the projects (and todos) to `localStorage` every time a new project (or todo) is created, and another function that looks for that data in `localStorage` when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:

    -   Make sure your app doesn’t crash if the data you may want retrieve from `localStorage` isn’t there!

    -   `localStorage` uses JSON to send and store data, and when you retrieve the data, it will also be in JSON format. You will learn more about this language in a later lesson, but it doesn’t hurt to get your feet wet now. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!
