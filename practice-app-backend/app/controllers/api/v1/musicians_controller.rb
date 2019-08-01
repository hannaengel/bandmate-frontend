class Api::V1::MusiciansController < ApplicationController
    skip_before_action :authorized, only: [:show, :create, :profile, :index]

    def profile 
      render json: { musician: MusicianSerializer.new(current_user)}, status: :accepted
    end
  
    def show 
      @musician = Musician.find(params[:id])
      render json: { musician: MusicianSerializer.new(@musician) }, status: :accepted
    end

    def create
        @musician = Musician.create(musician_params)
        if @musician
          @token = encode_token(musician_id: @musician.id)
         render json: { message: 'in create musician Controller', musician: MusicianSerializer.new(@musician), jwt: @token }, status: :created
       
         else
           render json: { error: 'failed to create musician' }, status: :not_acceptable
         end
      end
  
      def index
        if params[:search]
        @musicians = Musician.where('name LIKE ?', "%#{params[:search]}%")
        else
          @musicians = Musician.all
        end 
        render json: @musicians
      end 
  
      def update
      
        @musician = Musician.find(musician_params[:id])
        if @musician.update(musician_params)
          render json: @musician
        else
          render json: {error: 'failed to update musician' }, status: :not_acceptable
        end
      end

  
      private

      def musician_params
        params.require(:musician).permit(:id, :username, :search, :password, :email, :name, :instruments, :genres, :spotify, :soundcloud, :instagram, :facebook, :bio, :image_url)
      end

    end

    
