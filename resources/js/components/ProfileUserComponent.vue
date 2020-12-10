 <template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card card-widget widget-user my-3">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div class="widget-user-header text-white" style="center center">
            <h3 class="widget-user-username text-right">Elizabeth Pierce</h3>
            <h5 class="widget-user-desc text-right">Web Designer</h5>
          </div>
          <div class="widget-user-image">
            <img class="img-circle" alt="User Avatar" :src="getProfilePhoto()"/>
          </div>
          <br>
          <br>
          <br>
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">3,200</h5>
                  <span class="description-text">SALES</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">13,000</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">35</h5>
                  <span class="description-text">PRODUCTS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>

        <div class="card">
          <div class="card-header p-2">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" href="#activity" data-toggle="tab"
                  >Activity</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#settings" data-toggle="tab"
                  >Settings</a
                >
              </li>
            </ul>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active" id="activity">
                <!-- Post -->
                <div class="post">
                  <div class="user-block">
                    <img class="img-circle img-bordered-sm" alt="user image" />
                    <span class="username">
                      <a href="#">Jonathan Burke Jr.</a>
                      <a href="#" class="float-right btn-tool"
                        ><i class="fas fa-times"></i
                      ></a>
                    </span>
                    <span class="description"
                      >Shared publicly - 7:30 PM today</span
                    >
                  </div>
                  <!-- /.user-block -->
                  <p>
                    Lorem ipsum represents a long-held tradition for designers,
                    typographers and the like. Some people hate it and argue for
                    its demise, but others ignore the hate as they create
                    awesome tools to help create filler text for everyone from
                    bacon lovers to Charlie Sheen fans.
                  </p>

                  <p>
                    <a href="#" class="link-black text-sm mr-2"
                      ><i class="fas fa-share mr-1"></i> Share</a
                    >
                    <a href="#" class="link-black text-sm"
                      ><i class="far fa-thumbs-up mr-1"></i> Like</a
                    >
                    <span class="float-right">
                      <a href="#" class="link-black text-sm">
                        <i class="far fa-comments mr-1"></i> Comments (5)
                      </a>
                    </span>
                  </p>

                  <input
                    class="form-control form-control-sm"
                    type="text"
                    placeholder="Type a comment"
                  />
                </div>
                <!-- /.post -->
              </div>

              <!-- /.tab-pane -->
              <div class="tab-pane" id="settings">
                <form class="form-horizontal">
                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label"
                      >Name</label
                    >
                    <div class="col-sm-10">
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
                  </div>
                  <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label"
                      >Email</label
                    >
                    <div class="col-sm-10">
                      <input
                        v-model="form.email"
                        type="email"
                        name="email"
                        class="form-control"
                        id="email"
                        placeholder="Email"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                      />
                      <has-error :form="form" field="email"></has-error>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="bio" class="col-sm-2 col-form-label">Bio</label>
                    <div class="col-sm-10">
                      <textarea
                        class="form-control"
                        id="bio"
                        name="bio"
                        placeholder="Short bio for user(optional)"
                        :class="{ 'is-invalid': form.errors.has('bio') }"
                      ></textarea>
                      <has-error :form="form" field="bio"></has-error>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-sm-2 col-form-label"
                      >Password</label
                    >
                    <div class="col-sm-10">
                      <input
                        v-model="form.password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        :class="{ 'is-invalid': form.errors.has('password') }"
                      />
                      <has-error :form="form" field="password"></has-error>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="photo" class="col-sm-2 col-form-label">
                      Profile photo
                    </label>
                    <input
                      type="file"
                      @change="updateProfile"
                      name="photo"
                      id="photo"
                      class="form-control"
                    />
                  </div>

                  <div class="form-group row">
                    <div class="offset-sm-2 col-sm-10">
                      <button
                        @click.prevent="updateInfo"
                        type="submit"
                        class="btn btn-danger"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.nav-tabs-custom -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  created() {
    axios.get("api/profile").then(({ data }) => {
      this.form.fill(data);
    });
  },
  methods: {
    updateInfo() {
      this.$Progress.start();
      this.form
        .put("api/profile/")
        .then(() => {
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    },
    updateProfile(element) {
      let file = element.target.files[0];
      let reader = new FileReader();

      if (file["size"] < 2111775) {
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are uploading a big file(max 2MB)",
        });
      }
      reader.onloadend = (file) => {
        console.log("RESULT", reader.result);
        this.form.photo = reader.result;
      };
      reader.readAsDataURL(file);
    },
    getProfilePhoto(){
      let photo = (this.form.photo.length>200) ? this.form.photo :  "img/profile/"+this.form.photo ;
      return photo;
    },
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
