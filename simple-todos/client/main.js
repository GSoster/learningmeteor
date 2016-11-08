import {Template} from 'meteor/templating';
import {Tasks} from '../imports/api/tasks.js';

import '../imports/ui/body.js';

Template.body.helpers({
  tasks(){
    return Tasks.find({});
  },
});
