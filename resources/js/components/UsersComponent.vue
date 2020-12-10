<template>
  <div class="container">
    <div class="row mt-5" v-if="this.$gate.isAdminOrAuthor()">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
              <button type="button" class="btn btn-primary" @click="newModal">
                Add user <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered at</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in Users.data" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type | upText }}</td>
                  <td>{{ user.created_at | myDate }}</td>
                  <td>
                    <a href="#" @click="editModal(user)">
                      <i class="fas fa-edit"></i>
                    </a>

                    <a href="#" @click="deleteUser(user.id)">
                      <i class="fas fa-trash"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <pagination :data = "Users" @pagination-change-page="getResults"></pagination>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    
    <div v-if="!this.$gate.isAdminOrAuthor()">
      <access-denied></access-denied>
    </div>

    <!-- Modal -->
    <form
      method="post"
      @submit.prevent="editMode ? updateUser() : createUser()"
    >
      <div
        class="modal fade"
        id="addUser"
        data-backdrop="static"
        data-keyboard="false"
        tabindex="-1"
        aria-labelledby="addUserLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="editMode" class="modal-title" id="addUserLabel">
                Edit User
              </h5>
              <h5 v-else class="modal-title" id="addUserLabel">Add User</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
                  name="name"
                  placeholder="Name"
                  id="name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  name="email"
                  placeholder="Email Address"
                  id="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>
              <div class="form-group">
                <textarea
                  v-model="form.bio"
                  name="bio"
                  placeholder="Short bio for user(optional)"
                  id="bio"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('bio') }"
                ></textarea>
                <has-error :form="form" field="bio"></has-error>
              </div>
              <div class="form-group">
                <select
                  v-model="form.type"
                  type="type"
                  id="type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                  <option value="">Select user role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Standard User</option>
                  <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.password"
                  name="password"
                  placeholder="Introduce password"
                  id="password"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button v-if="editMode" type="submit" class="btn btn-primary">
                Update
              </button>
              <button v-else type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  created() {
    this.loadUsers();
    Fire.$on('searching',()=>{
      let query = this.$parent.search;
      axios.get('api/findUser?q='+query).then((data)=>{this.Users = data.data}).catch(()=>{});
    });
    // setInterval(()=>this.loadUsers(),3000);
  },
  data() {
    return {
      editMode: false,
      Users: {},
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: "",
      }),
    };
  },
  methods: {
    getResults(page=1){
      axios.get('api/user?page='+page).then(({data})=>{this.Users = data});
    },
    editModal(user) {
      this.editMode = true;
      this.form.reset();
      $("#addUser").modal("show");
      this.form.fill(user);
    },
    newModal() {
      this.editMode = false;
      this.form.reset();
      $("#addUser").modal("show");
    },
    loadUsers() {
      if (this.$gate.isAdminOrAuthor()) {
        axios.get("api/user").then(({ data }) => {
          this.Users = data;
        });
      }
    },
    createUser() {
      this.$Progress.start();
      this.form
        .post("api/user")
        .then(() => {
          $("#addUser").modal("hide");
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          this.$Progress.finish();
          this.loadUsers();
        })
        .catch(() => {});
    },
    updateUser() {
      $("#addUser").modal("hide");
      console.log("hola");
      this.$Progress.start();
      this.form
        .put("api/user/" + this.form.id)
        .then(() => {
          Swal.fire(
            "Updated!",
            "The information has been uupdated.",
            "success"
          );

          this.$Progress.finish();
          this.loadUsers();
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>",
          });
          this.$Progress.fail();
        });
    },
    deleteUser(id) {
      this.$Progress.start();
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.form
            .delete("api/user/" + id)
            .then(() => {
              this.$Progress.finish();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.loadUsers();
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: "<a href>Why do I have this issue?</a>",
              });
              this.$Progress.fail();
            });
        }
      });
    },
  },
};
</script>
