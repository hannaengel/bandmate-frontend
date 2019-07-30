class Listing < ApplicationRecord
    belongs_to :band 
   
    self.per_page = 8
  

    scope :search, -> (search) { where title: status }
    scope :instruments_search, -> (instruments_search) { where instruments: instruments_search }
end
