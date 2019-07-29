class ApplicationController < ActionController::API
     before_action :authorized
   
    def encode_token(payload)
      JWT.encode(payload, 'my_s3cr3t')
    end
   
    def auth_header
      # { Authorization: 'Bearer <token>' }
      request.headers['Authorization']
    end
   
    def decoded_token
      if auth_header
        token = auth_header.split(' ')[1]
        # header: { 'Authorization': 'Bearer <token>' }
        begin
          JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
        rescue JWT::DecodeError
          nil
        end
      end
    end
   
    def current_user
      if decoded_token && decoded_token[0]
        if decoded_token[0].keys.include?('band_id')
         band_id = decoded_token[0]['band_id']
         @band = Band.find_by(id: band_id)
        else 
          musician_id = decoded_token[0]['musician_id']
          @musician = Musician.find_by(id: musician_id)
    end 
  end
  end

   
   
    def logged_in?
      !!current_user
    end
   
    def authorized
      render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end
  end