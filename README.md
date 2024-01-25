# →TODOLIST ✨

<h4>
A project aimed at learning, but also at creating a "To do" in a freer way and according to my needs. </br>
Specifically, I'm just creating the Back-End and then applying it to a Front-End project.
</h4>

# Getting Started

### 🛡️Installation Requirements🛡️

- **Node.js:** LTS
- **PostgreSQL:** > 12v
- **NPM:** > 9.5.0

#

### Step 1 - Git Clone 🖨️
```
$ git clone https://github.com/Juaojoao/todo-list-back.git 
```

### Step 2 - NPM install (to install the dependencies) ⬇️
```
$ npm install
```

### Step 3 - Create an **_.env_** file in the root of the project ⚠️
```
DATABASE_URL=postgres://username:password@localhost:5432/database
```
> #### Fill in your database credentials ⚠️

### Step 4 - Use this command to create the tables in your database ✅
```
$ npx prima migrate dev -name name
```
