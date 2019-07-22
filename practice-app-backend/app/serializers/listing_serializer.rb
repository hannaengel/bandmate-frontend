class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :instruments, :band
end
