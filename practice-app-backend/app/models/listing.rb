class Listing < ApplicationRecord
    belongs_to :band 
    self.per_page = 8
end
