class Band < ApplicationRecord 
    has_secure_password
     validates :username, uniqueness: { case_sensitive: false }
    has_many :listings

end
