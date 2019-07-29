class MusicianSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :image_url, :bio, :soundcloud, :spotify, :instruments, :genres,  :facebook, :instagram
end
