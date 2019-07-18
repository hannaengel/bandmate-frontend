class Api::V1::AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]
   
    def create
      @band = Band.find_by(username: band_login_params[:username])
      if @band && @band.authenticate(band_login_params[:password])
        token = encode_token({ band_id: @band.id})
        render json: { band: UserSerializer.new(@band), jwt: token }, status: :accepted
      else
        render json: { message: 'Invalid username or password' }, status: :unauthorized
      end
    end
   
    private
   
    def band_login_params
      params.require(:band).permit(:username, :password)
    end
  end