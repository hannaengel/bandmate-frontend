class ApplicationController < ActionController::API
    before_action :authorized
   
    def encode_token(payload)
      # should store secret in env variable
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
   
    def current_band
      if decoded_token
        band_id = decoded_token[0]['band_id']
        @band = Band.find_by(id: band_id)
      end
    end
   
    def logged_in?
      !!current_band
    end
   
    def authorized
      render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end
  end