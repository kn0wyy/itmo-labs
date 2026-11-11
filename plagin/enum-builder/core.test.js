const test = require('node:test');
const assert = require('node:assert/strict');
const {generate} = require('./core');
test('автонумерация после заданного значения',()=>{const s=generate('Status: New, Active=5, Done');assert.match(s,/New = 0/);assert.match(s,/Done = 6/);assert.match(s,/case Status::Active/);});
test('отрицательные значения',()=>assert.match(generate('Code: Bad=-2, Other, Good'),/Other = -1/));
for(const input of ['', 'Status', 'Status:', '1Bad: A', 'class: A', 'X: A,A', 'X: A=1,B=1','X: A=1.5','X: A=2147483647,B','X: A,','X: X','X: A=foo','X: A=1=2','X: A=-2147483649']) test('отклонение '+JSON.stringify(input),()=>assert.throws(()=>generate(input)));
