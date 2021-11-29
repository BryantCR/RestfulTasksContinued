const {TaskModel} = require('./../models/ApiModel');

const TaskController = {

    allTasks: function(req, response){
        TaskModel
        .getAllTasks()
        .then( data => {
            let task = data.map(tasks => {
                console.log( tasks );
                return {
                    id: tasks._id,
                    title: tasks.title,
                    description : tasks.description,
                    completed : tasks.completed,
                    created_at : tasks.created_at,
                    updated_at : tasks.updated_at,
                    id2: tasks.task_id
                }
            })
        console.log( task );
        response.status( 200 ).json( {message: "Success!", task: task} );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
            response.json( err );
        })
    },

    addTask: function(request, response){

        let title = request.body.title;
        let description = request.body.description;
        let completed = request.body.completed;
        let created_at = new Date();
        let updated_at = new Date();

        if(title){
            newTask = {
                title,
                description,
                completed,
                created_at,
                updated_at
            }
            console.log("New task info: ", newTask);

            TaskModel
                .createTask( newTask )
                .then( result => {
                    response.status( 201 ).json( {message: "Success!", added: true, task: result } );
                });
        }
        else{
            response.statusMessage = "You are missing a field to create a new task ('title')";
            response.status( 406 ).end();
        }  
    },

    findByName : function ( request, response ) {
        let title = request.params.title;
        console.log("HERE", title);

        TaskModel
            .getTaskByName(title)
            .then( titles => {
                let task = titles
                console.log("HERE", task);
                response.status( 200 ).json( {message: "Success!", task : task} );
            })
    },

    removeTask : function(request, response){
        let title = request.params.title;
        console.log("HERE222 :", title);

        TaskModel
            .getTaskByName( title )
            .then( result => {
                if( result === null ){
                    console.log( "Something went wrong!" );
                }
                else{
                    TaskModel
                        .delete( title )
                        .then( result => {
                            response.status( 204 ).end();
                        });
                }
            })
    },

    update : function(request, response) {
        let title = request.params.title;
        console.log("Success L1 :", title);

        TaskModel
            .getTaskByName(title)
            .then(result => {
                if( result === null ){
                    console.log( "Something went wrong!" );
                    response.json({message: "Error!", error: err});
                }
                else {
                    let task = result;
                    console.log("HERE", task);
                    response.status( 200 ).json( {message: "Success!", task : task} );
                    if(task.title === request.body.title){
                        response.json({message: "Error!", error: err});
                    }
                    if(request.body.title){
                        task.title = request.body.title;
                    }
                    if(request.body.description){
                        task.description = request.body.description;
                    }
                    if(request.params.completed){
                        task.completed = request.body.completed;
                    }
                    task.save(function(err){
                        if(err){
                            res.json({message: "Error!", error: err});
                        }
                        else{
                            res.json({message: "Success!", task: task})
                        }
                    })
                }
            })
            
    }
    
}

module.exports = {TaskController};

//----------------------------------------------------dadaaad