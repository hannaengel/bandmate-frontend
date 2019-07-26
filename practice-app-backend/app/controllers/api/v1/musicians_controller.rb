class Api::V1::MusiciansController < ApplicationController
    skip_before_action :authorized, only: [:create, :index]

    def profile
        @musician = Musician.find(musician_params[:id])
        render json: { musician: @musician }, status: :accepted
      end

    def create
        @musician = Musician.create(musician_params)
         if @musician
        #   @token = encode_token(band_id: @musician.id)
          
        render json: { musician: @musician}, status: :created
        # else
        #   render json: { error: 'failed to create musician' }, status: :not_acceptable
         end
      end
  
      def index
        @musicians = Musician.all
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
        params.require(:musician).permit(:id, :username, :password, :email, :name, :instruments, :genres, :spotify, :soundcloud, :instagram, :facebook, :image_url)
      end

    end

    
