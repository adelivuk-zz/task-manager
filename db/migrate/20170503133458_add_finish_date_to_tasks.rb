class AddFinishDateToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :finish_date, :date
  end
end
