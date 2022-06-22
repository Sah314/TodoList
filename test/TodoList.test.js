const { assert } = require("chai")

const TodoList = artifacts.require('./TodoList.sol')
contract('TodoList', (accounts) => {
    before(async () => {
        this.todoList = await TodoList.deployed()
    })
    it("deploys successfully" , async() =>{
        const address = await this.todoList.address
        assert.notEqual(address,0x0)
        assert.notEqual(address,undefined)
        assert.notEqual(address,null)
        assert.notEqual(address,'')
    } )
    it('list tasks',async()=>{
        const taskCount = await this.todoList.taskcount()
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber() , taskCount.toNumber())
        assert.equal(task.completed , false)
        assert.equal(taskCount.toNumber() , 1)
        assert.equal(task.Content , "Padhai kar lo")
    })

    it('creates tasks' , async() =>{
        const result = await this.todoList.createTask('A new Task')
        const taskCount = await this.todoList.taskcount()
        assert.equal(taskCount,2)

        const event  = result.logs[0].args
        assert.equal(event.id.toNumber() , 2)
        assert.equal(event.Content , 'A new Task')
        assert.equal(event.completed ,false)

    })
    it('toggles completed tasks', async() =>{
        const result = await this.todoList.toggleCompleted(1)
        const task  = await this.todoList.tasks(1)
        assert.equal(task.completed ,true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber() , 1)
        assert.equal(event.completed ,true)

    })
})