import {Template} from 'meteor/templating';
import {Tasks} from '../imports/api/tasks.js';

import '../imports/ui/body.js';

Template.body.helpers({
  tasks(){
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});
