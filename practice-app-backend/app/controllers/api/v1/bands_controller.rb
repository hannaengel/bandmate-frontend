class Api::V1::BandsController < ApplicationController
  skip_before_action :authorized, only: [:create, :update, :index, :show]
      
    def profile 
      render json: { band: BandSerializer.new(current_band) }, status: :accepted
    end
  
    def show 
      render json: { band: BandSerializer.new(current_band) }, status: :accepted
    end
  
    
    def create
      @band = Band.create(band_create_params)  
      if @band
         @token = encode_token(band_id: @band.id)
        render json: { message: 'in create band bandController', band: BandSerializer.new(@band), jwt: @token }, status: :created
       else
         render json: { error: @band.errors }, status: :not_acceptable
         puts @band.errors
        end
    end

    def index
      @bands = Band.all
      render json: @bands
    end 


    def update
      @band = Band.find(band_params[:id])
      @band.update(band_params)
      if @band.update(band_params)
        render json: @band
      else
        render json: {error: 'failed to update band' }, status: :not_acceptable
      end
    end

    private
    def band_params
      params.require(:band).permit(:id, :username, :password, :email, :name, :instruments, :genres, :spotify, :soundcloud, :instagram, :facebook, :image_url, :band)
    end
    def band_create_params
      params.require(:band).permit(:id, :username, :password, :email, :name, :instruments, :genres, :spotify, :soundcloud, :instagram, :facebook, :image_url, :band)
    end
  end
  