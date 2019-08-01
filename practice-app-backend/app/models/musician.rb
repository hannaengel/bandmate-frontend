class Musician < ApplicationRecord
    has_secure_password

    # def self.search(search)
    #     if search
    #         self.where('name LIKE ?', "%#{params[:search]}%")
    #     else 
    #         Musician.all
    #     end 
    # end 
end
