class Api::V1::ListingsController < ApplicationController  
  skip_before_action :authorized
  
    def create
        @listing = Listing.create(listing_params)
         if @listing  
        render json: { listing: ListingSerializer.new(@listing) }, status: :created
         else
           render json: { error: 'failed to create listing' }, status: :not_acceptable
         end
      end
  
      def index
        
        #   if params[:search]
        #     @search = params[:search]
        #       @listings = Listing.where("title LIKE ?", "%#{params[:search]}%") && Listing.where("instruments LIKE ?", "%#{params[:search]}%")
        #     render json:{
        #       listings: @listings}
        #  else
        # if params[:search]
          # @search = params[:search]
          # if @search == 'oldest'
            # @listings = Listing.page(params[:page]).order('created_at ASC')
          # else
          @listings = Listing.page(params[:page]).order('created_at DESC')
          #  @listings = Listing.paginate(:page => params[:page])
          render json: @listings, 
          each_serializer: ListingSerializer
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
        params.require(:listing).permit(:id, :band_id, :description, :title, :instruments_search, :search, :instruments)
      end
    end
  

    
