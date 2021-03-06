// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract TodoList{
uint public taskcount = 0; 
struct Task{
    uint id;
    string Content; 
    bool completed;
}
mapping(uint => Task) public  tasks;
event TaskCreated(
 uint id,
    string Content, 
    bool completed
);
event TaskCompleted(
    uint id,
    bool completed
);
constructor() public{
    createTask("Padhai kar lo");

}
function createTask(string memory _content) public{
    taskcount++;
    tasks[taskcount] = Task(taskcount , _content , false);
    emit TaskCreated(taskcount, _content, false);
}
 function toggleCompleted(uint _id) public {
     Task memory _task  = tasks[_id];
     _task.completed = !_task.completed;
     tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
 }
}