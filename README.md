# Quizzical Solo Project 

A trivia app;
When the user first enters the app they are greeted with an introduction screen that has a start quizz button;
Clicking the start button will then pull trivia questions from OTDB API (open trivia database api);
Once the user is done selectig all their answers they can click check answers and the app will
score the answers and determine which ones are correct and which ones were incorrect and give them the chance to
try the quizz again with new questions;

Because i haven't learnt how to use react routes to create different routes for each page, i'll need to keep track of some state
that will determine which screen should be rendered.

* Requirements:
- Two screens (start and questions); conditionally render between the screens; the first one being the start screen, 
the second the is the list of questions and the possible answers;
- Pull 5 questions from the OTDB API (open trivia database api);
- Tally (calculate the total number of) correct answers after "check answers" is clicked;
- styled and polished;

* Hints:
- Use a library to decode the HTML Entities (example libaries: he or html-entities); both of the library examples have a decode method
that can turn the texts into more readable texts
- Create a new array with all answers. Randonly insert the correct_answer into the array with the incorrect_answers.
Use google/chatgpt for help on how to shuffle items in an array at random or how to insert an item randomly into an array.
-Limit answer choice to 1 and style select answer: either (1) track the select answer index inside each question obect, OR
(2) use an HTML from w/radio inputs using the same name attribute to automatically only allow one seletion (and check google
on how to style a radio input to look like a button - possibly hide the radio all together and style the label)
