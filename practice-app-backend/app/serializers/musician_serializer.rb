class MusicianSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :password,  :email, :image_url, :bio, :soundcloud, :spotify, :instruments, :genres,  :facebook, :instagram
end
