import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  shouldReloadRecord() {
   return false;
 },

 shouldReloadAll() {
   return false;
 },

 shouldBackgroundReloadRecord() {
   return false;
 },

 shouldBackgroundReloadAll() {
   return false;
 }

});
