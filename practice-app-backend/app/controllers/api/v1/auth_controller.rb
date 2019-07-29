class Api::V1::AuthController < ApplicationController
    skip_before_action :authorized, only: [:create, :create_musician]
   
    def create
      @band = Band.find_by(username: band_login_params[:username])
      if @band && @band.authenticate(band_login_params[:password])
        token = encode_token({ band_id: @band.id})
        render json: { message: 'In Create AuthController', band: @band, jwt: token }, status: :accepted
      else
        render json: { message: 'Invalid username or password' }, status: :unauthorized
      end
    end

    def create_musician
      @musician = Musician.find_by(username: musician_login_params[:username])
      
      if @musician && @musician.authenticate(musician_login_params[:password])
        token = encode_token({ musician_id: @musician.id}) 
        
        render json: { message: 'In Create AuthController', jwt: token }, status: :accepted
      else
        render json: { message: 'Invalid username or password' }, status: :unauthorized
      end
    end
   
    private
   
    def band_login_params
      params.require(:band).permit(:username, :password)
    end

    def musician_login_params
      params.require(:musician).permit(:username, :password)
    end
  end