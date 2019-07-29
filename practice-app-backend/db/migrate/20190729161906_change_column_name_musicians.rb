class ChangeColumnNameMusicians < ActiveRecord::Migration[5.2]
  def change
    rename_column :musicians, :password, :password_digest
  end
end
