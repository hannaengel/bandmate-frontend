class Api::V1::ListingsController < ApplicationController
    
    
  

    def create
        @listing = Listing.create(listing_params)
         if @listing  
       
        render json: { listing: ListingSerializer.new(@listing) }, status: :created
         else
           render json: { error: 'failed to create listing' }, status: :not_acceptable
         end
      end
  
      def index
        @listings = Listing.all
        render json: @listings
      end 
  
      def update
        @listing = Listing.find(listing_params[:id])
        if @listing.update(listing_params)
          render json: @listing
        else
          render json: {error: 'failed to update listing' }, status: :not_acceptable
        end
      end

    
      def destroy
        @listing = Listing.find(params[:id])
        @listing.destroy
        render json: Listing.all
    end
    
  
      private

      def listing_params
        params.require(:listing).permit(:id, :band_id, :description, :title, :instruments)
      end

    end

    
