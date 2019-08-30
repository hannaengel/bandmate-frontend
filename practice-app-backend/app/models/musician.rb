class Musician < ApplicationRecord
    has_secure_password
    scope :by_continent, lambda {|instrument| where(:continent => continent)}
    # scope :by_country, lambda {|name| where('name LIKE ?', "%#{params[:search]}%")}
   
end
