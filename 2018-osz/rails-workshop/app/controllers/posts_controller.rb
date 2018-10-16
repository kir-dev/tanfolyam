class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    @group = Group.find(params[:group_id])
    @post.user = current_user
    @post.group = @group
    if @group.can_create_post?(current_user)
      if @post.save
        redirect_to @group, notice: 'Post was successfully created.'
      else
        render :new
      end
    else
      redirect_to @group, notice: 'Csak csoporttag hozhat létre bejegyzést'
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    if @post.can_destroy?(current_user)
      @post.destroy
      redirect_to @post.group, notice: 'Post was successfully destroyed.'
    else
      redirect_to @post.group, notice: 'Nem törölheted'
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:content, :group_id)
    end
end
