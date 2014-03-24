class CommunitiesController < ApplicationController
	before_filter :authenticate_user!

	def index
		@communities = Community.all
	end

	def show
		 @community = Community.find(params[:id])
		 @tutorials = Tutorial.where(community_id: params[:id])
	end

	def new
		@community = Community.new
	end

	def create

		@community = Community.new(community_params)
		if @community.save
			flash[:notice]="Your community has been created"
			redirect_to @community
		else
			@errors = @community.errors.messages
			render "new"
		end
	end

	def create_user_membership
		current_user.communities << Community.find(params[:id])
		redirect_to communities_path(params[:id])
	end

	def delete_user_membership
		current_user.communities.destroy(params[:id])
		redirect_to user_path(current_user)

	end

	protected

	def community_params
		params.require(:community).permit(:name, :description)
	end

end