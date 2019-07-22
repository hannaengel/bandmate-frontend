class ChangeColumnNameBand < ActiveRecord::Migration[5.2]
  def change
    rename_column :bands, :instragram, :instagram
  end
end
