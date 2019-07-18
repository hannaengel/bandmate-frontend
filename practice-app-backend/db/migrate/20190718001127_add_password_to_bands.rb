class AddPasswordToBands < ActiveRecord::Migration[5.2]
  def change
    add_column :bands, :password, :string
  end
end
