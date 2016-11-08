
import { Tasks } from '../api/tasks.js';
import './task.html';
import './task.js';
import './body.html';



Template.body.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});


Template.body.events({
  'submit .new-task' (event) {
    event.preventDefault();
    console.log(event);
    const target = event.target;
    const text = target.text.value;

    Tasks.insert({
      text,
      createdAt: new Date(),
    });
    target.text.value = '';
  }
});
