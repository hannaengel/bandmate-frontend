class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :instruments, :created_at
  belongs_to :band

  def created_at
    end
end
