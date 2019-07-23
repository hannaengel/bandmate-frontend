class Api::V1::BandsController < ApplicationController
    # skip_before_action :authorized, only: [:create, :index]
      
    def profile
      render json: { band: current_band }, status: :accepted
    end
    
    def create
      @band = Band.create(band_params)
  
        if @band
      #   @token = encode_token(band_id: @band.id)
      #   debugger
        render json: { band: BandSerializer.new(@band) }, status: :created
        # render json: { band: @band, jwt: @token }, status: :created
      # else
      #   render json: { error: 'failed to create band' }, status: :not_acceptable
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
  end
  