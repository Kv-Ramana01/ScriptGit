function Git(name){
    this.name = name; //this will be our repo name
    this.lastCommitId = -1;
    // this.HEAD = null; //reference to last commit

    this.branches = []; //list of all branches

    //by default git gives a branch called master so ima define it below
    var master = new Branch("master", null);
    this.branches.push(master);//stores the master branch

    this.HEAD = master;
}

// var repo = new Git("my-repo");

// actual command is (git init) XD ill be adding more comments along the way 

function Commit(id, parent, message){
    this.id = id;
    this.parent = parent;
    this.message = message;
}

//Git.prototype means “all Git objects (like repo) will share this method." 
Git.prototype.commit = function(message){
    var commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);

    //update head and current branch pointer to new commit
    this.HEAD.commit = commit;
    return commit;
};


//In actual Git, commit id is a 40-hexdigit number also called as "SHA-1 id". But for keeping things simple we are using integers here.
// function Git(){
//     this.lastCommitId = -1;
// }

Git.prototype.log = function(){
    //start from HEAD commit
    var commit = this.HEAD.commit;
    var history = []; //this will contain array of commits in reverse order.

    //the steps to accomplish gitlike log
    //start from last commit
    //go back tracing to the first commit
    //push in history

    while(commit){
        history.push(commit);

        //this keeps following the parent like a linked list
        commit = commit.parent;
    }

    return history;
}

//can be used as repo.log();
//actual command > git log

//Branchs--
//A branch is nothing but a mere pointer to some commit. Seriously, that is it. That is what makes branches in Git so lightweight and use-n-throw type. You may say HEAD was exactly this. You are right. The only difference being that HEAD is just one (because at a given time you are only on a single commit) but branches can be many, each pointing to a commit.

function Branch(name , commit){
    this.name = name;
    this.commit = commit;
}

Git.prototype.checkout = function (branchName) {
    //check if branch already exists with name = branchNamew

    for(var i = this.branches.length; i--;){
        if(this.branches[i].name == branchName){
            //we found an existing branch
            console.log("Switched to existing branch: " + branchName);
            this.HEAD = this.branches[i];
            return this;
        }
    }

    //we reach here if there are no matching branch
    //if branch was not found then create a new one

    var newBranch = new Branch(branchName, this.HEAD.commit);

    //store the branch
    this.branches.push(newBranch);

    //update the head
    this.HEAD = newBranch;

    console.log("Switched to new Branch: " +branchName);
    return this;

};

//actual command:
//> git checkout existing-branch
//> git checkout -b new-branch





