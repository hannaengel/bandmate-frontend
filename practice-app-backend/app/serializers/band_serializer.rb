class BandSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :image_url, :bio, :soundcloud, :spotify, :instruments, :genres, :facebook, :instagram, :listings
end