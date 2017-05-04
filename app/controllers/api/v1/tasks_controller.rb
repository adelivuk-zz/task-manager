class Api::V1::TasksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.tasks.order('created_at DESC')
  end

  def create
    respond_with :api, :v1, current_user.tasks.create(task_params)
  end

  def destroy
    respond_with Task.destroy(params[:id])
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes(task_params)
    respond_with task, json: task
  end

  private

  def task_params
    params.require(:task).permit(:id, :title, :description, :finish_date)
  end
end
